# ts-npm-starter

[![npm](https://img.shields.io/npm/v/ts-npm-starter?color=F25A1D&label=npm)](https://www.npmjs.com/package/ts-npm-starter)
[![CI](https://github.com/oleg-koval/ts-npm-starter/actions/workflows/code-quality.yml/badge.svg)](https://github.com/oleg-koval/ts-npm-starter/actions/workflows/code-quality.yml)
[![Coverage](https://coveralls.io/repos/github/oleg-koval/ts-npm-starter/badge.svg?branch=main)](https://coveralls.io/github/oleg-koval/ts-npm-starter?branch=main)
[![License: MIT](https://img.shields.io/badge/license-MIT-062F34)](LICENSE)
[![Node](https://img.shields.io/node/v/ts-npm-starter)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](tsconfig.json)

> **GitHub Template** — production-ready TypeScript npm package starter.
> Click **"Use this template"** to create your own repo in seconds.

---

## What's included

| Concern   | Tool                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------- |
| Language  | TypeScript 5 — strict mode, `NodeNext` modules                                                      |
| Build     | [tsup](https://tsup.egoist.dev/) — ESM + `.d.ts` in one command                                     |
| Tests     | [Vitest](https://vitest.dev/) — fast, native ESM, coverage with v8                                  |
| Lint      | [typescript-eslint](https://typescript-eslint.io/) — strict type-aware rules                        |
| Format    | [Prettier](https://prettier.io/)                                                                    |
| Release   | [semantic-release](https://semantic-release.gitbook.io/) — fully automated npm publish              |
| CI        | GitHub Actions — typecheck + lint + test (Node 20 & 22 matrix)                                      |
| Coverage  | [Coveralls](https://coveralls.io/) — via `GITHUB_TOKEN`, no extra secrets                           |
| Docs      | [TypeDoc](https://typedoc.org/) → GitHub Pages                                                      |
| Security  | CodeQL weekly scan                                                                                  |
| Bots      | Dependabot + [pr-automerge-github-action](https://github.com/oleg-koval/pr-automerge-github-action) |
| Doc index | [docs-index-keeper](https://github.com/oleg-koval/docs-index-keeper)                                |

---

## Getting started

### 1. Use this template

Click **"Use this template"** → **"Create a new repository"** on GitHub.

### 2. Replace placeholders

Search and replace these strings across the repo:

| Placeholder         | Replace with                               |
| ------------------- | ------------------------------------------ |
| `YOUR_PACKAGE_NAME` | Your npm package name (e.g. `my-cool-lib`) |
| `YOUR_GITHUB_USER`  | Your GitHub username                       |
| `YOUR_NAME`         | Your full name                             |
| `YOUR_EMAIL`        | Your email                                 |
| `YOUR_URL`          | Your website URL                           |
| `YOUR_DESCRIPTION`  | One-line package description               |

Files to update: `package.json`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/README.md`.

### 3. Replace the example source

The template ships with a trivial `greet()` function as a working example.
Delete `src/greet.ts`, `src/types.ts`, and `tests/greet.test.ts`, then add your own.

### 4. Configure secrets

| Secret      | Where                               | Purpose        |
| ----------- | ----------------------------------- | -------------- |
| `NPM_TOKEN` | Repo → Settings → Secrets → Actions | Publish to npm |

`NPM_TOKEN` must be a **Granular Access Token** with **Read and write** on packages.
All other workflows use `GITHUB_TOKEN` (auto-provided by GitHub Actions).

### 5. Enable GitHub Pages

Repo → Settings → Pages → Source: **GitHub Actions**

TypeDoc will publish your API docs to `https://oleg-koval.github.io/ts-npm-starter` on every push to `main`.

### 6. Register on Coveralls

Visit [coveralls.io](https://coveralls.io), sign in with GitHub, and enable your new repo.
Coverage uploads automatically via the CI workflow — no token needed.

### 7. Push to main

The first push triggers CI. Once it passes, semantic-release publishes `v1.0.0` to npm automatically.

---

## Project structure

```
src/
  index.ts          — public exports (edit to match your API)
  types.ts          — shared TypeScript types
  greet.ts          — example implementation (replace with yours)
tests/
  greet.test.ts     — example tests (replace with yours)
examples/           — usage examples (optional, excluded from lint)
docs/
  README.md         — documentation index (managed by docs-index-keeper)
.github/
  workflows/
    code-quality.yml  — typecheck, lint, format, test, coverage
    npm-release.yml   — semantic-release on push to main
    pages.yml         — TypeDoc → GitHub Pages
    codeql.yml        — weekly security scan
    automerge.yml     — auto-merge Dependabot/Renovate PRs
  ISSUE_TEMPLATE/   — bug report + feature request
  PULL_REQUEST_TEMPLATE.md
  pr-bot-automerge.yml
```

---

## Scripts

```bash
npm run build          # compile src/ → dist/ (ESM + .d.ts)
npm run typecheck      # tsc --noEmit
npm run lint           # eslint src tests
npm run lint:fix       # eslint --fix
npm run format         # prettier --write
npm run format:check   # prettier --check (used in CI)
npm run test           # vitest run
npm run test:watch     # vitest (watch mode)
npm run test:coverage  # vitest run --coverage
npm run ci             # typecheck + lint + test:coverage (full local CI)
npm run build:docs     # typedoc → docs/api/
npm run docs:index     # docs-index-keeper update
```

---

## Release flow

Commit messages drive versioning — no manual version bumps ever:

| Commit prefix                           | Release type              |
| --------------------------------------- | ------------------------- |
| `fix:`                                  | Patch (`1.0.0` → `1.0.1`) |
| `feat:`                                 | Minor (`1.0.0` → `1.1.0`) |
| `feat!:` or `BREAKING CHANGE:`          | Major (`1.0.0` → `2.0.0`) |
| `chore:`, `docs:`, `test:`, `refactor:` | No release                |

On every push to `main` that contains a `fix:` or `feat:` commit:

1. `semantic-release` calculates the next version
2. Updates `CHANGELOG.md` and `package.json`
3. Publishes to npm with `dist-tag: latest`
4. Creates a GitHub Release with auto-generated notes
5. Commits `CHANGELOG.md` + `package.json` back to `main` (`[skip ci]`)

---

## Related packages

This template was extracted from [react-honeypot-field](https://github.com/oleg-koval/react-honeypot-field) — the first package built with it.

Other packages by the same author:

- [trembita](https://github.com/oleg-koval/trembita) — lightweight TypeScript HTTP client
- [docs-index-keeper](https://github.com/oleg-koval/docs-index-keeper) — auto-maintain docs index
- [drop-em-dash-eslint-rule](https://github.com/oleg-koval/drop-em-dash-eslint-rule) — ban em dashes from LLM output
- [pr-automerge-github-action](https://github.com/oleg-koval/pr-automerge-github-action) — auto-merge bot PRs

---

## License

[MIT](LICENSE)
