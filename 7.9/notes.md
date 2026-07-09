# 7.9

## 1. Real API Practice

I practiced calling a real public API. The main structure:

fetch URL
await response
check response.ok
await response.json()
use the returned data

API requests are not only about writing `fetch`, but also about checking whether the response actually matches the data shape I expect.

## 2. Weather API Exercise

This exercise calls the Open-Meteo weather API for Paris and requests current weather data such as temperature, humidity, and wind speed.

Problem I ran into: the weather API request returned an error status at one point. The code was correct in structure, but the API response itself was not successful.

This helped me understand why this check is necessary:

> ```ts
> if (!response.ok) {
>   throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
> }
> ```

A real API can fail even when my TypeScript code is correct. This is different from local practice data. With real APIs, I need to handle network errors, server errors, wrong endpoints, and unexpected response shapes.

## 3. GitHub API

This exercise calls the GitHub API and fetches information about the Microsoft TypeScript repository.

The response includes information such as repository name, full name, and description. This exercise worked more smoothly and helped me practice the same `fetch + async/await` pattern with a different real API response.

## 4. Type Narrowing

I continued my TypeScript study with `unknown` + type guard + type narrowing.

```ts
function isUser(value: unknown): value is User
```

This function checks whether external data really has the expected `User` shape. `unknown` means the data could be anything. This is useful because data from outside the program — especially API data — should not be trusted immediately.

Before using it as a `User`, I need to check it with `isUser()` first.

## 5. Type Guard

The type guard checks the actual runtime shape of the data, rather than just trusting the declared TypeScript type.

**Next step:** apply this same pattern (`isX(value: unknown): value is X`) to the GitHub and weather API responses in sections 2–3, instead of using `as Type` assertions there — that closes the gap between "I know how to validate unknown data" and "I actually validate my real API responses."