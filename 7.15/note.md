# 7.15 — React Setup, JSX, and Props

## What I Practiced

Today I created a React + TypeScript project with Vite and built a simple Homello profile card.
Vite serves the app at `localhost:5173` and updates the page automatically after files are saved.

## JSX

JSX is used to describe React interfaces inside TypeScript or JavaScript.

Main differences from normal HTML:

- `className` is used instead of `class`
- `{}` inserts JavaScript expressions
- Elements must be closed
- A component returns one root element
- Files containing JSX use the `.tsx` extension

## Components and Props

A React component is a function that returns JSX.

`App.tsx` renders the reusable `ProfileCard` component and passes data through props.

```text
App.tsx → props → ProfileCard.tsx → JSX
```

The props are typed with a TypeScript interface, similar to typed function parameters.

The card receives:

- Name
- Age
- City
- Verification status
- Move-in date
- Roommate preference

## Conditional Rendering

The verification badge is displayed only when `verified` is true.
When the condition is false, React does not render the element.

## Styling

The component uses separate CSS files and keeps the Homello visual language:

- Purple gradient
- Rounded corners
- Soft shadow
- Poppins font
- Mauve background
- Compact mobile layout

## Result

The project ran successfully and the profile card rendered correctly.

Today was lighter than the previous TypeScript sessions, but it established the main React structure:

component → props → JSX → browser

State and event handling will be studied next.