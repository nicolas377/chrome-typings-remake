1. wipe the output
2. read in old.d.ts
3. create list of namespaces
4. create namespaces in their files
5. create main file, it should look like this

```ts
// imports
import * as x from './x';
import * as y from './y';
import * as z from './z';

declare global {
    namespace chrome {
        export { x, y, z };
    }
}

export {}; // this is the most important part, def has to export smth for it to work
```
