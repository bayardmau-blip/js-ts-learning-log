import { useEffect, useState } from "react";

import "./RepositoryCard.css";

interface GitHubRepo {
  id: number;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
}

interface RepositoryCardProps {
  owner: string;
  repository: string;
}

function isGitHubRepo(value: unknown): value is GitHubRepo {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const repo = value as Record<string, unknown>;

  return (
    typeof repo.id === "number" &&
    typeof repo.full_name === "string" &&
    (typeof repo.description === "string" ||
      repo.description === null) &&
    typeof repo.html_url === "string" &&
    (typeof repo.language === "string" ||
      repo.language === null) &&
    typeof repo.stargazers_count === "number" &&
    typeof repo.forks_count === "number" &&
    typeof repo.open_issues_count === "number" &&
    typeof repo.archived === "boolean"
  );
}

function RepositoryCard({
  owner,
  repository,
}: RepositoryCardProps) {
  const [data, setData] = useState<GitHubRepo | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepository(): Promise<void> {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repository}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}.`,
          );
        }

        const result: unknown = await response.json();

        if (!isGitHubRepo(result)) {
          throw new Error(
            "The API response has an unexpected structure.",
          );
        }

        setData(result);
      } catch (caughtError: unknown) {
        if (
          caughtError instanceof DOMException &&
          caughtError.name === "AbortError"
        ) {
          return;
        }

        if (caughtError instanceof Error) {
          setError(caughtError.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadRepository();

    return () => {
      controller.abort();
    };
  }, [owner, repository]);

  if (isLoading) {
    return (
      <article className="repository-card status-card">
        <p className="status-label">Loading</p>
        <h2>Fetching repository data…</h2>
      </article>
    );
  }

  if (error) {
    return (
      <article className="repository-card status-card">
        <p className="status-label status-label--error">
          Error
        </p>

        <h2>Repository could not be loaded.</h2>
        <p>{error}</p>
      </article>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <article className="repository-card">
      <header className="repository-card__header">
        <p className="repository-card__eyebrow">
          GitHub repository
        </p>

        <div className="repository-card__title-row">
          <h2>{data.full_name}</h2>

          {data.archived && (
            <span className="repository-card__badge">
              Archived
            </span>
          )}
        </div>

        <p className="repository-card__description">
          {data.description ?? "No description provided."}
        </p>
      </header>

      <div className="repository-card__body">
        <div className="repository-card__language">
          <span className="repository-card__dot" />

          {data.language ?? "Unknown language"}
        </div>

        <div className="repository-card__statistics">
          <RepositoryStatistic
            label="Stars"
            value={data.stargazers_count}
          />

          <RepositoryStatistic
            label="Forks"
            value={data.forks_count}
          />

          <RepositoryStatistic
            label="Open issues"
            value={data.open_issues_count}
          />
        </div>

        <a
          className="repository-card__link"
          href={data.html_url}
          target="_blank"
          rel="noreferrer"
        >
          Open repository
        </a>
      </div>
    </article>
  );
}

interface RepositoryStatisticProps {
  label: string;
  value: number;
}

function RepositoryStatistic({
  label,
  value,
}: RepositoryStatisticProps) {
  return (
    <div className="repository-card__statistic">
      <strong>{value.toLocaleString()}</strong>
      <span>{label}</span>
    </div>
  );
}

export default RepositoryCard;