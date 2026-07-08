# 7.8 
# Fetch API, Async/Await

Today I continued my JavaScript and TypeScript learning plan.

1. Understanding asynchronous JavaScript more deeply
2. Moving from basic TypeScript syntax toward more practical TypeScript patterns

## 1. Review: Event Loop and `setTimeout`

console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");

Keypoint: JavaScript executes synchronous code first on the call stack.

`console.log("1")` runs immediately.
Then `setTimeout` registers its callback with the timer system. Even though the delay is `0`, the callback does not execute immediately. It waits in the task queue.
After that, `console.log("3")` runs because it is still synchronous code.
Only when the call stack is empty does the event loop move the `setTimeout` callback back onto the call stack. Then `console.log("2")` runs.

## 2. Fetch API

I started learning how to call an API using `fetch`, `async`, and `await`.

The script sends a GET request to:
https://jsonplaceholder.typicode.com/users/4 --public API endpoint for study

basic request flow:

fetch URL
await response
check response.ok
await response.json()
use the returned data


The TypeScript code defines an `ApiUser` interface to describe the expected shape of the returned user data.

The function `getUser(id: number): Promise<ApiUser>` sends the request and returns a typed user object.

## 3. Important Concepts Practiced with Fetch

- Calling an API with `fetch`
- Using `await` to wait for the HTTP response
- Checking `response.ok` before using the data
- Throwing an error when the response is not successful
- Parsing JSON with `await response.json()`
- Using a TypeScript interface to describe the expected API data shape
- Handling errors with `try/catch`
- Using `error instanceof Error` before reading `error.message`

fetch returns a Promise.
await fetch(...) waits for the server response.
await response.json() waits for the response body to be parsed into a JavaScript object.

## 4. Problem I Had: Editing `.js` Instead of `.ts`

One problem I had today was that I changed the generated `.js` file and it worked when running with Node.js, but the TypeScript file still had problems.

The important lesson is:

The .ts file is the source file.
The .js file is the compiled output.

The correct workflow should be:

edit .ts
compile .ts into .js
run .js with Node.js

So I should not mainly edit the generated `.js` file.

## 6. Problem I Had: Changing API Data

I also tested changing the user ID.

For example, changing const user = await getUser(1); to: const user = await getUser(4);

worked because the API endpoint still returns a user with the same data shape.

However, I learned that if I change the API endpoint from `users` to something else, such as `posts`, I also need to update:

1. The URL
2. The TypeScript interface
3. The properties used in `console.log`

For example, a user has `name`, `email`, and `address.city`, but a post has `title` and `body`.
When changing an API endpoint, the TypeScript interface must match the new response shape.

## 7. Real API Status

I have not yet applied a real production API or financial API today.
The next step will be to try a more realistic API, possibly a financial data API, after I am more comfortable with the basic fetch structure.

## 8. TypeScript Types

I practiced union types, optional properties, and a generic ApiResponse<T> type. 