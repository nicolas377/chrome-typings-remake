import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join as joinPaths } from 'node:path';
import { ModuleDeclaration, Project, SourceFile } from 'ts-morph';
import { SyntaxKind } from 'typescript';

// TODO: is this a ref or a unique string?
const homeDir = joinPaths(__dirname, '..');
const srcDir = joinPaths(homeDir, 'src');

function writeFile(path: string, content: string): void {
    if (!existsSync(dirname(path))) {
        mkdirSync(srcDir);
    }

    writeFileSync(path, content, 'utf-8');
}

export function transform(): void {
    // clear old src dir
    rmSync(joinPaths(homeDir, 'src'), { recursive: true, force: true });

    const morphProject = new Project();
    // access the monofile from here
    const monoFile = morphProject.addSourceFileAtPath(joinPaths(homeDir, 'old.d.ts'));

    // TODO: if this is only used once, just create and then iterate
    const namespacesLinkMap = createNamespaceLinkMap(monoFile);

    namespacesLinkMap.forEach((declaration, name) => {
        // find refs to other chrome apis, and make them imports
        // create file name
        // copy paste in namespace content
    });

    // create namespaces [foo, foo/bar, x], linked to their declarations
    function createNamespaceLinkMap(monoFile: SourceFile): Map<string, ModuleDeclaration> {
        const namespaces = new Map<string, ModuleDeclaration>();

        // gets all the names of the namespaces into one array ([chrome.foo, chrome.foo.bar]), then starts a loop over it
        monoFile
            .getModules()
            .map(statement => [statement, statement.getName()] as const)
            .forEach(([statement, name]) => {
                name.split('.').forEach((part, i, arr) => {
                    // ignore the "chrome" section
                    if (i === 0) return;
                    else if (arr.length > 1) {
                        // dealing with chrome.foo.bar
                        if (i == 1) {
                            // check if "foo" exists, if not, add it
                            if (namespaces.has(part)) return;
                            else namespaces.set(part, statement);
                        } else {
                            // we're in the bar section
                            namespaces.set(`${arr[1]}/${part}`, statement);
                        }
                    }
                    // dealing with chrome.foo
                    else namespaces.set(part, statement);
                });
            });

        return namespaces;
    }
}
