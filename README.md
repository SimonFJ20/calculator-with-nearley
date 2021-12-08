
# calculator-with-nearley

A simple CLI calculator

## Requirements

- [NodeJS & NPM](https://nodejs.org/)
- (Optional) [Yarn](https://yarnpkg.com/getting-started/install)
- (Optional) [Nearley](https://nearley.js.org/docs/getting-started)

## Instructions

If you dont have/want `nearleyc` installed on your system, use the [compiled branch](https://github.com/SimonFJ20/calculator-with-nearley/tree/compiled).

1. Clone repo

`main` branch:
```sh
git clone https://github.com/SimonFJ20/calculator-with-nearley.git
```

`compiled` branch:
```sh
git clone https://github.com/SimonFJ20/calculator-with-nearley.git -b compiled
```

2. Install dependencies

```sh
yarn
```

or if you dont have/want `yarn` on your system
```sh
npm install
```

3. Compile grammar

If on `compiled` branch, skip this step.

Use `Makefile` or
```sh
nearleyc grammar.ne -o grammar.js
```

4. Run

```sh
node .
```

