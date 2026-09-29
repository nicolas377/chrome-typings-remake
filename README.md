# `@types/chrome` transformer

A transformer to modularize the Chrome typings.

## Why

I've been helping maintain [`@types/chrome`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/chrome) (part of the DefinitelyTyped universe) for about 5 years now.
It's a great package that has done a lot of good in the chrome extension world, but its structure has always been a monofile since it was originally created in 2012.

It was already a bit of a chunky guy at its [initial commit](https://github.com/DefinitelyTyped/DefinitelyTyped/commit/774ed3682614c56f1961856d5f80ed79dc83b8c9), weighing in at a hefty 2,300 lines, and in its illustrious 14 year (and counting!) career, it's bulked up to weigh in at a whopping 15 _thousand_ lines!

It's hard to express this. That's a **lot** of code.

Such a large file presents a couple issues.

First off, it can simply be a hard file to open. 15K lines of documentating every nook and cranny of the Chrome API will take its toll on a poor laptop that's already having its RAM eaten by 3 electron applications, especially when your editor tries to give you pretty syntax highlighting and nice intellisense over the entire behemoth of a file.

It can be also be nightmare to maintain. For example, try scrolling through to find `chrome.tabs.Tab`, a core part of the types. You'll be scrolling for a while, as it sits about 11 thousand lines down.

It can also be quite hard to quickly place where a change is happening from just a GitHub diff. VSCode is nice enough to show everything the line you're at is currently nested in, but GitHub doesn't, leading to plenty of scrolling to line 7500 to figure out what documentation you need to look up.

Overall, it's getting a little too painful. I originally had the idea to break the types up by their namespaces in mid 2022. The monofile is far too large to do the conversion by hand, so I started writing some code later that year, came back to it in late 2023, but this project has been left alone since then.

For the last few years I've been really busy with finishing high school and starting college. Don't get me wrong, I'm still really busy, but I think this project holds a good bit of value, so I'm going to start chipping away at it.

## Current status

As a bit of a life lesson to any young programmer out there that's somehow read this far, don't let your life just be coding. I guess all of y'all use Cursor now though, so maybe I'll revise that. Don't let your life just be coding, but please actually know how to code. That said, my life is far from just coding. I'm currently working on another very large project for my internship, and once that's done it'll be time to go back to classes.

So no guarentees on when this is going to be done. I'll try and keep this section updated (within reason) as things happen, but right now I'm really just brainstorming out how this project will actually work.

### Upstream todos

- [ ] Move `SetRequired` into notifications and `SetPartial` into webRequest
- [ ] Outdated ref into filesystem, `DirectoryEntry` -> `FileSystemDirectoryEntry`

## Repo layout

```text
├── src
│   ├── README.md      # Contains more details about the implementation and its layout.
│   └── start.ts       # The entrypoint of the script.
├── old.d.ts           # Monofile-style chrome defs. Gitignored.
├── eslint.config.mjs  # Global eslint configuration.
├── tsconfig.json      # Global tsc configuration
├── package-lock.json  # NPM-style package-lock.json
├── package.json       # NPM-style package.json
├── LICENSE            # This project is under the MIT license.
└── README.md          # This file
```

## Credits

Created by [Nick Rodriguez](https://github.com/nicolas377) and licensed under the [MIT license](./LICENSE).
