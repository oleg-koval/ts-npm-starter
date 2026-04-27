# Contributing

Thank you for taking the time to contribute.

## Code of Conduct

Be kind and constructive. Harassment of any kind is not tolerated.

## How to Contribute

### Reporting bugs

Open an issue using the **Bug report** template. Include a minimal reproduction.

### Suggesting features

Open an issue using the **Feature request** template. Explain the problem you're solving.

### Submitting a pull request

1. **Fork** the repository and create a branch from `main`.
2. **Install** dependencies: `npm install`
3. **Make your changes** in `src/`.
4. **Add or update tests** in `tests/`. Coverage should not decrease.
5. **Run the full CI suite locally**: `npm run ci`
6. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add X` — new feature (triggers minor release)
   - `fix: correct Y` — bug fix (triggers patch release)
   - `feat!: change Z` — breaking change (triggers major release)
   - `docs:`, `chore:`, `test:`, `refactor:` — no release
7. **Open a PR** against `main`. Fill in the PR template.

## Development Setup

```bash
git clone https://github.com/oleg-koval/ts-npm-starter.git
cd ts-npm-starter
npm install

npm run test:watch   # tests in watch mode
npm run ci           # full CI check (typecheck + lint + coverage)
npm run build        # build the package
```

## Project Structure

```
src/
  index.ts     — public exports
  types.ts     — shared TypeScript types
  *.ts         — implementation modules
tests/
  *.test.ts    — Vitest test suites
examples/      — usage examples
docs/
  README.md    — documentation index (managed by docs-index-keeper)
```

## Release Process

Releases are fully automated via [semantic-release](https://semantic-release.gitbook.io/).
Every merge to `main`:

1. Analyses commit messages since the last release
2. Determines the next version (patch / minor / major)
3. Generates `CHANGELOG.md`
4. Publishes to npm
5. Creates a GitHub Release
6. Commits `package.json` and `CHANGELOG.md` back to `main`

**Never bump versions manually.** Write good commit messages; the tooling handles the rest.

## Questions?

Open a [Discussion](https://github.com/oleg-koval/ts-npm-starter/discussions) for anything that doesn't fit a bug report or feature request.
