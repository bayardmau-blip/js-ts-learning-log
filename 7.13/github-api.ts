// 7.13
// GitHub API functions for automated testing

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
}

/**
 * Thrown whenever a call to the GitHub API fails, either because the HTTP
 * response was not ok, or because the response body did not match the
 * shape we expect. `status` lets callers branch on the HTTP status code
 * instead of parsing the error message string.
 */
export class GitHubApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

/**
 * Runtime type guard for GitHubRepo. `response.json()` returns `unknown`
 * (well, `any`, but we treat it as `unknown`), so we validate the shape
 * ourselves instead of trusting a bare `as GitHubRepo` assertion, which
 * would silently accept anything GitHub (or a network error page) sends.
 */
export function isGitHubRepo(value: unknown): value is GitHubRepo {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const repo = value as Record<string, unknown>;

  return (
    typeof repo.id === "number" &&
    typeof repo.name === "string" &&
    typeof repo.full_name === "string" &&
    typeof repo.html_url === "string" &&
    (typeof repo.description === "string" || repo.description === null) &&
    (typeof repo.language === "string" || repo.language === null) &&
    typeof repo.stargazers_count === "number" &&
    typeof repo.forks_count === "number" &&
    typeof repo.archived === "boolean"
  );
}

export async function getRepository(
  owner: string,
  repo: string,
): Promise<GitHubRepo> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "typescript-bun-test-practice",
      },
    },
  );

  if (!response.ok) {
    throw new GitHubApiError(
      response.status,
      `Failed to fetch repository. Status: ${response.status}`,
    );
  }

  const data: unknown = await response.json();

  if (!isGitHubRepo(data)) {
    throw new GitHubApiError(
      response.status,
      "GitHub API response does not match the expected GitHubRepo shape.",
    );
  }

  return data;
}

export function createRepoSummary(repo: GitHubRepo): string {
  const language = repo.language ?? "Unknown";

  return `${repo.full_name} | ${language} | ${repo.stargazers_count} stars`;
}