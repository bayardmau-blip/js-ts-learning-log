# 7.20 
# Next.js Fundamentals

Main ideas reviews from React effects and data fetching:

`useState` is used to store component state. For API fetching, the most common states are data, loading, and error. When state changes, React re-renders the component.

`useEffect` is used to synchronize a component with an external system, such as an API, timer, event listener, subscription, or WebSocket connection.

The basic flow is:

Render → Effect runs → External operation → State updates → Re-render

The dependency array controls when an effect runs. An empty dependency array means the effect runs after the component first mounts. When dependencies are included, the effect runs again when one of those dependencies changes.

Cleanup functions are used to stop or remove effects that are no longer needed. They are especially useful for timers, event listeners, subscriptions, and connections.

## Why Next.js?

React mainly focuses on components, state, UI, and interaction.

Next.js builds on React and provides additional framework features such as routing, layouts, server rendering, and server-side capabilities.

Today I focused on file-based routing and layouts.

### App Router

Next.js uses the `app` directory to define routes.

A `page.tsx` file represents a page that can be accessed through a URL.

The folder structure determines the route structure. For example, a page inside an `about` folder becomes the `/about` route.

This means routing can be created directly through folders and files instead of manually configuring every route.

### page.tsx

A `page.tsx` file defines the content displayed for a specific route.

The root `page.tsx` represents the homepage, while pages inside nested folders represent nested routes.

### layout.tsx

A `layout.tsx` file defines shared UI that appears around multiple pages.

It can contain elements such as headers, navigation bars, sidebars, or footers.

The current page is rendered inside the layout through the `children` property.

Mental model:

Layout = shared outer structure  
Page = changing route content

## Result

Today I successfully created and ran a Next.js project using Bun.

I practiced:

- understanding why Next.js is used instead of plain React
- using the App Router
- creating file-based routes
- creating a nested `/about` route
- understanding `page.tsx`
- understanding `layout.tsx`
- understanding how shared layouts wrap different pages