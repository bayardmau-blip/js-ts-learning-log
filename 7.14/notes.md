# 7.14 — Dependency Injection and Test Configuration

Today I improved the GitHub API tests by replacing global `fetch` mocking with dependency injection.

Instead of letting `getRepository()` always use the global `fetch`, the function now receives a typed `Fetcher` parameter. This makes the dependency explicit and allows each test to provide its own fake response.

Main benefits:

- No need to modify `globalThis.fetch`
- No need for `spyOn`, `mock.restore`, or `afterEach`
- Tests are easier to read and isolate
- The code is easier to reuse in future black-box testing

The final test result was:

5 pass
0 fail

## Dependency Injection

```ts
before: getRepository() directly used the global fetch
after: getRepository(owner, repository, fakeFetch)
```

A function type called `Fetcher` defines what kind of function can be injected.

This is useful because the production code can use the real `fetch`, while tests can use small fake functions that return controlled responses.

## Tests Added

The tests covered:

- Creating a repository summary
- Handling a repository with no language
- Returning a valid repository response
- Throwing a typed error for a 404 response
- Rejecting an invalid response body

The API response is still validated at runtime before it is returned as `GitHubRepo`.

## TypeScript Configuration Problem

The TypeScript compiler initially printed its help page instead of checking the project.

The problem was a filename typo... Because of this, TypeScript could not find the project configuration. After renaming the file, this command worked correctly. No output means the type check passed.

## Fixing the Previous 7.13 Tests

The root `tsconfig.json` originally included only the new folder. It was updated to include both:

"include": [
  "7.13/**/*.ts",
  "7.14/**/*.ts"
]

The 7.13 tests then passed successfully. The two orange tests were not errors. They were real-network integration tests intentionally skipped by default.