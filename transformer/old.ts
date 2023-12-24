import { execSync } from 'node:child_process';
import { rmSync, readFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import {
    ExportDeclaration,
    ImportDeclarationStructure,
    IndentationText,
    ModuleDeclarationKind,
    OptionalKind,
    Project,
    QuoteKind,
    SourceFile,
} from 'ts-morph';

rmSync('src', { recursive: true, force: true });

const project = new Project({
    manipulationSettings: {
        indentationText: IndentationText.FourSpaces,
        quoteKind: QuoteKind.Single,
    },
});

project.addSourceFileAtPath('./old.d.ts');

const oldChromeDefs = project.getSourceFileOrThrow('./old.d.ts');

const mainNewDefs = project.createSourceFile('./src/index.d.ts');

const globalNamespace = mainNewDefs.addModule({
    name: 'global',
    hasDeclareKeyword: true,
});

globalNamespace.setDeclarationKind(ModuleDeclarationKind.Global);

const globalChromeNamespace = globalNamespace.addModule({
    name: 'chrome',
});

globalChromeNamespace.setDeclarationKind(ModuleDeclarationKind.Namespace);

// start the actual work

// get all the namespace declarations in the old defs
const oldNamespaces = oldChromeDefs.getModules().filter(m => m.getName() !== 'chrome');

const nestedNamespaceNames: Set<string> = new Set();

// TODO: put the exports and imports in alphabetical order

for (const oldNamespace of oldNamespaces) {
    // get the name of the namespace, and remove the "chrome." prefix and replace dots with slashes
    const newNamespaceName = oldNamespace
        .getName()
        .replace(/^chrome\./, '')
        .replace(/\./g, '/');
    if (newNamespaceName.indexOf('/') !== -1) {
        nestedNamespaceNames.add(newNamespaceName.split('/')[0]);
    }
    // create a new file for the namespace
    const newNamespaceFile = project.createSourceFile(`./src/${newNamespaceName}.d.ts`);
    // spit out all the contents of the old namespace, excluding the actual namespace declaration into the new file
    newNamespaceFile.addStatements(oldNamespace.getStatements().map(s => s.getText()));

    addNamespaceExport(newNamespaceName, newNamespaceFile);
    newNamespaceFile.formatText();
}

for (const nestedNamespaceName of nestedNamespaceNames) {
    let fileAlreadyExists = false;
    const nestedNamespaceFileName = `./src/${nestedNamespaceName}.d.ts`;

    let nestedNamespaceFile: SourceFile | undefined;

    let existingNestedNamespaceFile = project.getSourceFile(nestedNamespaceFileName);
    if (existingNestedNamespaceFile) {
        nestedNamespaceFile = existingNestedNamespaceFile;
        fileAlreadyExists = true;
    } else {
        nestedNamespaceFile = project.createSourceFile(nestedNamespaceFileName);
    }

    // Get all the names of the files in the src/namespace directory
    const nestedNamespaceFiles = project
        .getSourceFiles()
        .filter(f => f.getFilePath().indexOf(`src/${nestedNamespaceName}/`) !== -1);

    // Import the nested namespaces from nestedNamespaceFile
    nestedNamespaceFile.addImportDeclarations(
        nestedNamespaceFiles.map(
            (file): OptionalKind<ImportDeclarationStructure> => ({
                moduleSpecifier: `./${nestedNamespaceName}/${file.getBaseNameWithoutExtension()}`,
                namespaceImport: file.getBaseNameWithoutExtension(),
            }),
        ),
    );
    // Add an export statement to the nestedNamespaceFile that looks like this:
    // export { alarms };
    nestedNamespaceFile.addExportDeclaration({
        namedExports: nestedNamespaceFiles.map(f => f.getBaseNameWithoutExtension()),
    });

    // If the file already exists, we don't need to add an export statement to the main index.d.ts file
    addNamespaceExport(nestedNamespaceName, nestedNamespaceFile, !fileAlreadyExists);
}

const chromeNamespaceRefs = oldChromeDefs.getModuleOrThrow('chrome').findReferencesAsNodes();

for (const chromeNamespaceRef of chromeNamespaceRefs) {
    const chromeNamespaceRefFile = chromeNamespaceRef.getSourceFile();

    if (chromeNamespaceRefFile.getFilePath().indexOf('src') === -1) continue;

    const chromeNamespaceRegex = /chrome\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)/;

    if (chromeNamespaceRef.wasForgotten()) continue;

    const fullReferenceNode = chromeNamespaceRef.getAncestors().find(a => chromeNamespaceRegex.test(a.getText()));

    // get the full reference path
    const [, fileName, toImport] = chromeNamespaceRegex.exec(fullReferenceNode?.getText() ?? '') ?? [];

    if (!fileName || !toImport) continue;

    // get the file that the reference is in
    const fileForImporting = project.getSourceFileOrThrow(`./src/${fileName}.d.ts`);

    // are we in a folder in the src directory?
    const isNested =
        relative(dirname(chromeNamespaceRefFile.getFilePath()), fileForImporting.getFilePath()).indexOf('..') !== -1;

    if (
        !chromeNamespaceRef
            .getSourceFile()
            .getImportDeclaration(i => i.getNamedImports().some(n => n.getName() === toImport))
    ) {
        chromeNamespaceRefFile.addImportDeclaration({
            moduleSpecifier: `${isNested ? '../' : './'}${fileName}`,
            namedImports: [toImport],
        });
    }

    fullReferenceNode?.replaceWithText(toImport);
}

for (const sourceFile of project.getSourceFiles()) {
    sourceFile.formatText();
}

mainNewDefs.insertText(0, readFileSync('header.txt', 'utf8') + '\n');

mainNewDefs.addExportDeclaration({});

mainNewDefs.formatText();

project.saveSync();

// run prettier on the src directory
execSync('npx prettier --write src');

function addNamespaceExport(namespaceName: string, namespaceFile: SourceFile, override = false) {
    if (!override && [...nestedNamespaceNames.values()].some(n => namespaceName.indexOf(n) !== -1)) {
        return;
    }

    const existingExportDeclaration: ExportDeclaration | undefined = globalChromeNamespace.getExportDeclarations()[0];

    // Add an import statement to the main index.d.ts file that looks like this:
    // import * as alarms from './alarms';
    mainNewDefs.addImportDeclaration({
        moduleSpecifier: `./${namespaceName}`,
        namespaceImport: namespaceName.replace(/\//g, '_'),
    });

    // If the namespace is a top-level namespace, add an export statement to the main index.d.ts file that looks like this:
    // export { alarms };
    if (existingExportDeclaration === undefined) {
        if (namespaceName.indexOf('_') === -1) {
            globalChromeNamespace.addExportDeclaration({
                namedExports: [namespaceName.replace(/\//g, '_')],
            });
        }
    } else {
        if (namespaceName.indexOf('_') === -1) {
            existingExportDeclaration.addNamedExport(namespaceName.replace(/\//g, '_'));
        }
    }
}

export {};
