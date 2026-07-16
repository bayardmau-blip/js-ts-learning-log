# 7.16 
# React State, Effects, and Data Fetching


Today I learned how React handles asynchronous data with useState and useEffect.

The project fetches GitHub repository data and displays three possible UI states:

loading → success
loading → error

The main state values were data, isLoading and error. Updating state causes React to render the component again.

## useEffect

useEffect is used to synchronize a component with an external system, such as an API.

component renders
→ effect starts the request
→ data is received
→ state updates
→ component renders again

The dependency array: [owner, repository]

means the effect runs again whenever either value changes.

## Cleanup

An AbortController was used to cancel an outdated request when the selected repository changes.

This prevents an older response from overwriting newer data. The cleanup function runs before the next effect and when the component is removed.

## Loading and Error States

The loading screen appeared only briefly because the GitHub API responded quickly. This was still correct behavior:

isLoading = true  → loading UI
data received     → success UI
request failed    → error UI

## TypeScript Issue

The repository IDs were inferred as:

"typescript" | "react" | "bun"

However, event.target.value was typed as a general string.

Problematic code:

setSelectedId(event.target.value);

The fix was to define a RepositoryId type and narrow the selected value before updating state.

## Key Difference from Yesterday

Yesterday, the component only received fixed props and rendered JSX.

Today, the component could be:

- remember changing values
- react to user selection
- fetch external data
- display loading, error, and success states
- cancel outdated requests

## Mental Model

- useState: component memory
- useEffect: synchronization with an external system
- dependency array: when synchronization should restart
- cleanup: stop outdated work

## Result

The repository selector and GitHub data card worked successfully.

The main React cycle was:
render → effect → fetch → state update → re-render
