# 7.10 
## Bun Runtime, Real API List, and TypeScript Result Types

Today I switched my TypeScript practice workflow from manual compilation to Bun.

## 1. Bun Workflow

Bun was really a nice tool running a ts!

## 2. Real API List Practice

I created `real-api-repos-list.ts`.

This file calls the GitHub API and fetches a list of repositories from the Microsoft organization.

This is different from the previous API exercise because the response is an array of objects, not just one object.

I practiced processing real API array data with map, filter, find and reduce.. 

Real API data often comes as arrays of objects, so array methods are very important for handling returned data.

## 3. Error Handling and Optional Chaining

I continued using `response.ok` to check whether the API request was successful.

I also practiced optional chaining because some functions may return `undefined`, such as when searching for a repository that may not exist in the returned list.

When working with real API data, I need to handle both request failures and missing values safely.

## 4. TypeScript Result Types

I created `ts-result-types.ts`.

This file practices discriminated unions for API-like success/error results.

The result can be either:

a success result with data
an error result with a message

Discriminated unions make success/error handling clearer and safer because TypeScript can understand which fields are available based on the result status.
