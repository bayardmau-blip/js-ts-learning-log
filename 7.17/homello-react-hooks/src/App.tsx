import { useState } from "react";

import "./App.css";

import RepositoryCard from "./components/RepositoryCard";
import RepositorySelector from "./components/RepositorySelector";

import {
  repositories,
  type RepositoryId,
} from "./data/repositories";

function App() {
  const [selectedId, setSelectedId] =
    useState<RepositoryId>(
      repositories[0].id,
    );

  const selectedRepository =
    repositories.find(
      (repository) =>
        repository.id === selectedId,
    ) ?? repositories[0];

  return (
    <main className="app">
      <section className="app__content">
        <header className="app__header">
          <p className="app__brand">
            Homello Lab
          </p>

          <h1>Reusable React logic</h1>

          <p>
            Repository selection and API fetching are
            now separated into reusable components and
            a custom Hook.
          </p>
        </header>

        <RepositorySelector
          options={repositories}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

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