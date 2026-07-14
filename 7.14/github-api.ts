// 7.14
// Dependency injection with a typed fetch function

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

export type Fetcher = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export class GitHubApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);

    this.name = "GitHubApiError";
    this.status = status;
  }
}

export function isGitHubRepo(
  value: unknown,
): value is GitHubRepo {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const repo = value as Record<string, unknown>;

  return (
    typeof repo.id === "number" &&
    typeof repo.name === "string" &&
    typeof repo.full_name === "string" &&
    typeof repo.html_url === "string" &&
    (typeof repo.description === "string" ||
      repo.description === null) &&
    (typeof repo.language === "string" ||
      repo.language === null) &&
    typeof repo.stargazers_count === "number" &&
    typeof repo.forks_count === "number" &&
    typeof repo.archived === "boolean"
  );
}

export async function getRepository(
  owner: string,
  repository: string,
  fetcher: Fetcher = fetch,
): Promise<GitHubRepo> {
  const url =
    `https://api.github.com/repos/${owner}/${repository}`;

  const response = await fetcher(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "typescript-bun-test-practice",
    },
  });

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
      "GitHub API response does not match GitHubRepo.",
    );
  }

  return data;
}

export function createRepoSummary(
  repo: GitHubRepo,
): string {
  const language = repo.language ?? "Unknown";

  return (
    `${repo.full_name} | ${language} | ` +
    `${repo.stargazers_count} stars`
  );
}