import { useRepository } from "../hooks/useRepository";

import "./RepositoryCard.css";

interface RepositoryCardProps {
  owner: string;
  repository: string;
}

function RepositoryCard({
  owner,
  repository,
}: RepositoryCardProps) {
  const {
    data,
    isLoading,
    error,
  } = useRepository(owner, repository);

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
          {data.description ??
            "No description provided."}
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