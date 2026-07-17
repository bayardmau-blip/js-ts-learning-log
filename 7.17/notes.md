# 7.17 
# Lifting State Up and Custom Hooks


Today I reorganized the React project into clearer and more reusable parts.

The shared repository selection state now lives in App.tsx because both the selector and the repository card depend on it.

App
├─ RepositorySelector
└─ RepositoryCard

This is called lifting state up: shared state is moved to the closest common parent and passed down through props.

## Custom Hook

The API logic was moved out of RepositoryCard.tsx into useRepository.ts
The custom Hook now handles:

- useState
- useEffect
- GitHub API fetching
- loading and error state
- runtime validation
- request cleanup with AbortController

RepositoryCard only receives the Hook result and renders the UI.
useRepository()

→ data / isLoading / error
→ RepositoryCard

A custom Hook shares reusable stateful logic, not the same state instance.

## Safer Select Handling

The selector validates the selected value before passing it back to the parent.

This avoids directly forcing a general string into the narrower RepositoryId type.

## Problems Encountered

### Wrong terminal location

pm run dev was first executed from the repository root, where no dev script existed.
The command had to be run inside 7.17/homello-react-hooks

### Import and filename checks
### Default export issue

The compiler reported that RepositorySelector had no default export.
The export line already appeared to exist, but re-entering and saving:

export default RepositorySelector;

made the compiler recognize it. This was likely caused by stale editor or HMR state.

## Result

The page rendered correctly after the fixes.

The final structure separates responsibilities more clearly:

App
→ owns shared selection state

RepositorySelector
→ displays and changes the selection

RepositoryCard
→ renders repository information

useRepository
→ handles reusable API logic

The main lesson was:

lifting state up
= move shared state to the closest common parent

custom Hook
= extract reusable stateful logic from a component