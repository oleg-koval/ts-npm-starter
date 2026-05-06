# Plan: Enforce Hard Rules — ts-npm-starter

## Context

`ts-npm-starter` is the canonical TypeScript/Node library starter. It already has ESLint
(strict type-checked), Prettier, Vitest with 90%+ coverage thresholds, and a solid CI
pipeline (`code-quality.yml`). What's missing is **local enforcement** — currently nothing
blocks a commit that breaks lint, formatting, or tests locally. The 300-line cap is also not
enforced by ESLint.

Source: [oleg-koval/RULES.md §2](https://github.com/oleg-koval/starters/blob/main/RULES.md)

---

## Gaps

| Rule                          | Current state            | Gap                                |
| ----------------------------- | ------------------------ | ---------------------------------- |
| §2.2 File length 300-line cap | Not in ESLint config     | Add `max-lines` rule               |
| §2.4 Pre-commit hooks         | Not configured (CI-only) | Add `lefthook.yml`                 |
| §2.3 E2E > unit               | Only unit tests exist    | Add guidance + E2E example pattern |

---

## Changes

### 1. `eslint.config.mjs` — add `max-lines` rule

Add to the `src/**/*.ts` block **and** the `tests/**/*.ts` block:

```js
rules: {
  'max-lines': ['error', { max: 300, skipBlankLines: false, skipComments: false }],
  // ...existing rules
}
```

Generated files are exempt by default since `dist/**` is already in `ignores`. No changes
needed for the ignores block.

Full diff:

```diff
 // src/ block
 rules: {
+  'max-lines': ['error', { max: 300, skipBlankLines: false, skipComments: false }],
   '@typescript-eslint/explicit-module-boundary-types': 'warn',
   '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
 },

 // tests/ block
 rules: {
+  'max-lines': ['error', { max: 300, skipBlankLines: false, skipComments: false }],
   '@typescript-eslint/no-explicit-any': 'off',
   ...
 },
```

### 2. Create `lefthook.yml`

New file at repo root. Runs the existing npm scripts — no new commands to learn.

```yaml
pre-commit:
  parallel: false
  commands:
    typecheck:
      run: npm run typecheck
    lint:
      run: npm run lint
    format-check:
      run: npm run format:check
    test:
      run: npm test
```

> `parallel: false` keeps output readable and ensures failures are reported in order.
> `test` runs the full suite on commit — fast enough (~1s) for a library starter. If a
> project grows, extract a `test:unit` script and replace `npm test` here.

### 3. `package.json` — install lefthook and wire `prepare`

Add to `devDependencies`:

```json
"lefthook": "^1.11.0"
```

Add to `scripts`:

```json
"prepare": "lefthook install"
```

This auto-installs the git hook when contributors run `npm ci` or `npm install`.

### 4. `AGENTS.md` — add pre-commit section

Add a new section after "Commands":

````markdown
## Pre-commit hooks

Lefthook runs automatically on `git commit`. It executes typecheck → lint →
format:check → test in sequence and blocks the commit on any failure.

To install manually (already runs on `npm ci`):

```bash
npx lefthook install
```
````

To skip once (discouraged — CI will still catch it):

```bash
git commit --no-verify  # rejected in code review
```

````

### 5. E2E test pattern (guidance only — no new test files required)

Add a note in `AGENTS.md` under "Conventions":

```markdown
- Prefer integration/E2E tests that exercise the public API end-to-end.
  Unit-test only pure functions with non-trivial branching. Do not mock
  internal collaborators to hit coverage targets.
````

---

## Files changed

| File                | Change                                                   |
| ------------------- | -------------------------------------------------------- |
| `eslint.config.mjs` | Add `max-lines: [error, 300]` to both rule blocks        |
| `lefthook.yml`      | Create — pre-commit gates for typecheck/lint/format/test |
| `package.json`      | Add `lefthook` devDep + `prepare` script                 |
| `AGENTS.md`         | Add pre-commit section + E2E test guidance               |

---

## Verification

```bash
# 1. Install deps with the new prepare hook
npm ci

# 2. Verify lefthook is installed
cat .git/hooks/pre-commit  # should reference lefthook

# 3. Verify max-lines rule fires on a synthetic violation
node -e "console.log(Array(302).fill('const x = 1').join('\n'))" > /tmp/big.ts
cp /tmp/big.ts src/toobig.ts
npm run lint  # should error on max-lines
rm src/toobig.ts

# 4. Make a clean commit — hooks should pass
git add -A && git commit -m "test: verify hooks pass"
```
