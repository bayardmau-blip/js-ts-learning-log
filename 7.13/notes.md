# 7.13 — Bun Testing and TypeScript Setup

Today I learned how to use Bun for automated testing in TypeScript.

The main ideas were:

- Separating source code from test code
- Using `describe`, `test`, and `expect`
- Writing both positive and negative tests
- Mocking `fetch` so tests do not depend on the real GitHub API
- Validating API responses at runtime instead of trusting a type assertion
- Understanding the difference between Bun runtime execution and TypeScript type checking

The tests covered:

- Creating a repository summary
- Handling `null` language values
- Returning valid repository data
- Throwing a 404 error
- Rejecting an invalid API response shape

This is directly related to the future Homello black-box testing work:

send request → receive response → validate result → pass or fail


## Important Concepts

### Bun runtime vs TypeScript checking

Bun can execute TypeScript tests directly. TypeScript checking is a separate step:

bun run typecheck

This means tests may run successfully even when VS Code still shows type-related red underlines.

### Runtime validation

API data is external and should not be trusted automatically.

The response was treated as `unknown` and checked with a type guard before being returned as `GitHubRepo`.

This is safer than using a direct type assertion because a type assertion does not verify the real response at runtime.

### Mocked tests vs real network tests

Mocked tests are more stable because they do not depend on:

- Internet access
- GitHub rate limits
- External API availability

Real integration tests were kept optional.

# Problems Encountered

## 1. VS Code could not resolve `bun:test`

Problematic line:

```ts
import { describe, expect, test } from "bun:test";
```

VS Code showed:

Cannot find module 'bun:test'

The tests could still run because `bun:test` is built into Bun, but the TypeScript language service still had trouble resolving the type declarations.

The attempted fix was:

bun add -d typescript @types/bun

and adding Bun types in `tsconfig.json`.

---

## 2. Directly replacing `global.fetch` caused a type error

Problematic code:

```ts
global.fetch = mockFunction as typeof fetch;
```

The mock function did not fully match Bun's `fetch` type.

It was replaced with Bun's mocking API:

```ts
spyOn(globalThis, "fetch").mockResolvedValue(...)
```

This was cleaner and type-safe.

## 3. `process.env` remained underlined

Problematic line:

```ts
process.env.RUN_GITHUB_INTEGRATION === "1";
```

This suggests that VS Code was still not loading the expected environment type declarations correctly.

## 4. Tests passed while editor errors remained

The tests worked, but VS Code still showed red underlines.

This confirmed that:

runtime success ≠ editor type configuration success

The remaining issue appears to be related to the local TypeScript or VS Code language-service configuration, not the main test logic.

## Current Status

The Bun tests worked successfully. The editor type-resolution issue was not fully solved and will be checked later with:

bunx tsc --noEmit

If this command succeeds, the problem is probably limited to VS Code.