# 7.7 A further step for JavaScript and TypeScript.

## TypeScript part:

Working with typed object data using a `User` interface.

The main concepts were:

* Defining an interface to describe the shape of an object
* Creating an array of typed objects with `User[]`-- specially shaped
* Processing arrays with key methods: map, filter, find and reduce
* Writing typed functions with clear parameter and return types

## Array Methods

I practiced using `map` to transform, `filter` to select, `find` to get one specific objest and `reduce` to calculate.
It's been useful because API responses are often arrays of objects, and these methods are common when processing returned data.

## TypeScript Function Types

Few examples i had:

* A function returning `User[]`
* A function returning `User | undefined`
* A function returning `number`

The `User | undefined` return type is important because methods like `find()` may not always find a matching result.

## Async / Await

Learning asynchronous programming with `Promise`, `async`, and `await`.

* `Promise<void>` for a task that finishes later but does not return data
* `Promise<string>` for a task that finishes later and returns a string
* `async function`
* `await`
* using `setTimeout` to simulate a delayed asynchronous task

## Main Takeaway

A Promise represents a task that will finish later.

An `async` function allows me to use `await`.

`await` waits for a Promise to finish before continuing inside that function.

## Difficulty

The syntax is not too hard to understand, but I need more practice to use these patterns naturally. More focus on:

* arrow functions
* array methods
* typed return values
* Promise return types
* async/await execution order

## Next

The next step is to apply async/await to real API requests with `fetch`.
