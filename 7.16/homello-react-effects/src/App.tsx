import { useState } from "react";

import "./App.css";

import RepositoryCard from "./components/RepositoryCard";

const repositories = [
  {
    id: "typescript",
    label: "TypeScript",
    owner: "microsoft",
    repository: "TypeScript",
  },
  {
    id: "react",
    label: "React",
    owner: "facebook",
    repository: "react",
  },
  {
    id: "bun",
    label: "Bun",
    owner: "oven-sh",
    repository: "bun",
  },
] as const;

function App() {
  const [selectedId, setSelectedId] = useState(
    repositories[0].id,
  );

  const selectedRepository =
    repositories.find(
      (repository) => repository.id === selectedId,
    ) ?? repositories[0];

  return (
    <main className="app">
      <section className="app__content">
        <header className="app__header">
          <p className="app__brand">Homello</p>

          <h1>React data fetching</h1>

          <p>
            Choose a repository and let the component
            synchronize itself with the GitHub API.
          </p>
        </header>

        <label className="repository-selector">
          <span>Repository</span>

          <select
            value={selectedId}
            onChange={(event) => {
              setSelectedId(event.target.value);
            }}
          >
            {repositories.map((repository) => (
              <option
                key={repository.id}
                value={repository.id}
              >
                {repository.label}
              </option>
            ))}
          </select>
        </label>

        <RepositoryCard
          owner={selectedRepository.owner}
          repository={
            selectedRepository.repository
          }
        />
      </section>
    </main>
  );
}

export default App;