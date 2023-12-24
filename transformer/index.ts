import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join as joinPaths } from 'node:path';
import { ModuleDeclaration, Project, SourceFile } from 'ts-morph';
import { SyntaxKind } from 'typescript';

// TODO: is this a ref or a unique string?
const homeDir = joinPaths(__dirname, '..');
const srcDir = joinPaths(homeDir, 'src');

export function transform(): void {
    // clear old src dir
    rmSync(joinPaths(homeDir, 'src'), { recursive: true, force: true });

    const morphProject = new Project();
    // access the monofile from here
    const monoFile = morphProject.addSourceFileAtPath(joinPaths(homeDir, 'old.d.ts'));

    const namespaces = findNamespacesInMonoFile(monoFile);

    console.log(namespaces);

    // writing an example file for now
    mkdirSync(srcDir);
    writeFileSync(joinPaths(srcDir, 'index.txt'), 'hi', 'utf-8');

    // create namespaces [foo, [foo, bar], x]
    function findNamespacesInMonoFile(monoFile: SourceFile): (string | string[])[] {
        const namespaces: (string | string[])[] = [];

        // gets all the names of the namespaces into one array ([chrome.foo, chrome.foo.bar]), then starts a loop over it
        (
            monoFile
                .getStatements()
                // the type narrowing from node.isKind doesn't play nicely with .filter(), so this is safe
                .filter(node => node.isKind(SyntaxKind.ModuleDeclaration)) as ModuleDeclaration[]
        )
            .map(statement => statement.getName())
            .forEach(name => {
                name.split('.').forEach((part, i, arr) => {
                    // ignore the "chrome" section
                    if (i === 0) return;
                    else if (arr.length > 1) {
                        // dealing with chrome.foo.bar
                        if (i == 1) {
                            // check if "foo" exists, if not, add it
                            if (namespaces.includes(part)) return;
                            else namespaces.push(part);
                        } else {
                            // we're in the bar section
                            namespaces.push(`${arr[1]}/${part}`);
                        }
                    }
                    // dealing with chrome.foo
                    else namespaces.push(part);
                });
            });

        return namespaces;
    }
}
