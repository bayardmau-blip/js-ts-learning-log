# Summary Note — JavaScript & TypeScript

## JS syntax

- `const` / `let` declarations
- Function using template literals (`describeStudent`)
- `studentProfile` object
- `listings` array of objects
- `Array.filter()` to extract verified and affordable listings
- The `affordableListings` filter compares each listing's rent with the student's budget.

## TypeScript basic

- Primitive types (`string`, `number`, `boolean`)
- Typed function (parameters + return value)
- `type` aliases (`StudentProfile`, `HousingListing`)
- Typed array (`HousingListing[]`)
- `filter` with a typed arrow function

**JS vs TS**

**JavaScript**

- Checks types only when the code runs
- No type annotations — variables can hold anything
- Objects and arrays can be any shape or mix of types
- Functions don't enforce parameter or return types

**TypeScript**

- Checks types while you write the code, before it runs
- Explicit annotations (: string, : number, etc.)
- type aliases lock objects into a fixed shape
- Arrays (Type[]) shall use one consistent type
- Functions enforce parameter and return types

## Takeaway for next time
- Pick a single source of truth for a repeated value
- TS catches silent type errors that JS lets slip through.
