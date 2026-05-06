# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot).

## Setup

```bash
npm ci
```

## Commands

- Run tests: `npm test`
- Test with coverage: `npm run test:coverage`
- Type-check: `npm run typecheck`
- Lint: `npm run lint` (auto-fix: `npm run lint:fix`)
- Format: `npm run format`
- Build: `npm run build`
- Full local CI: `npm run ci`

CI runs `npm run ci` plus format check. All must pass.

## Pre-commit hooks

Lefthook runs on every `git commit`: typecheck → lint → format:check → test.
Install once after `npm ci` (runs automatically via `prepare`):

```bash
npx lefthook install
```

`git commit --no-verify` is rejected in code review.

## Conventions

- TypeScript 5, strict mode, NodeNext modules. ESM only.
- Conventional Commits drive versioning via semantic-release.
  Use `feat:`, `fix:`, `feat!:` for breaking, `chore:`/`docs:`/`test:` for no release.
- Tests live in `tests/`, mirror `src/` layout, use Vitest. Prefer integration tests
  that exercise the public API end-to-end. Unit-test only pure functions with
  non-trivial branching — do not mock internal collaborators to hit coverage targets.
- Public API exports go through `src/index.ts`. Internal types in `src/types.ts`.

## Don't

- Don't bump version in package.json manually — semantic-release owns versioning.
- Don't commit without `npm run ci` passing.
- Don't add deps without checking bundle impact (this is a published package).
- Don't use `any`. Use `unknown` and narrow.
