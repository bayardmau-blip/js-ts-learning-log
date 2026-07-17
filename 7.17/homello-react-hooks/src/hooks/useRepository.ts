import { useEffect, useState } from "react";

import type { GitHubRepo } from "../types/github";

interface UseRepositoryResult {
  data: GitHubRepo | null;
  isLoading: boolean;
  error: string | null;
}

function isGitHubRepo(
  value: unknown,
): value is GitHubRepo {
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

export function useRepository(
  owner: string,
  repository: string,
): UseRepositoryResult {
  const [data, setData] =
    useState<GitHubRepo | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepository(): Promise<void> {
      setData(null);
      setError(null);
      setIsLoading(true);

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

        const result: unknown =
          await response.json();

        if (!isGitHubRepo(result)) {
          throw new Error(
            "The API returned an unexpected response.",
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

  return {
    data,
    isLoading,
    error,
  };
}