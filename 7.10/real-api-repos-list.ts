// 7.10
// Exercise TypeScript

export {};

interface GitHubRepo {
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

async function getOrganizationRepos(org: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/orgs/${org}/repos?per_page=20&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "typescript-fetch-practice",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories. Status: ${response.status}`);
  }

  const repos = (await response.json()) as GitHubRepo[];

  return repos;
}

function getRepoNames(repos: GitHubRepo[]): string[] {
  return repos.map((repo) => repo.full_name);
}

function getReposByLanguage(
  repos: GitHubRepo[],
  language: string
): GitHubRepo[] {
  return repos.filter((repo) => repo.language === language);
}

function getActiveRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((repo) => !repo.archived);
}

function findRepoByName(
  repos: GitHubRepo[],
  name: string
): GitHubRepo | undefined {
  return repos.find((repo) => repo.name === name);
}

function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}

function getMostStarredRepo(repos: GitHubRepo[]): GitHubRepo | undefined {
  if (repos.length === 0) {
    return undefined;
  }

  return repos.reduce((mostStarred, currentRepo) => {
    if (currentRepo.stargazers_count > mostStarred.stargazers_count) {
      return currentRepo;
    }

    return mostStarred;
  });
}

async function main(): Promise<void> {
  try {
    const repos = await getOrganizationRepos("microsoft");

    const repoNames = getRepoNames(repos);
    const typeScriptRepos = getReposByLanguage(repos, "TypeScript");
    const activeRepos = getActiveRepos(repos);
    const typeScriptRepo = findRepoByName(repos, "TypeScript");
    const totalStars = getTotalStars(repos);
    const mostStarredRepo = getMostStarredRepo(repos);

    console.log("Repository names:", repoNames);
    console.log("TypeScript repos:", typeScriptRepos.map((repo) => repo.name));
    console.log("Number of active repos:", activeRepos.length);
    console.log("Found TypeScript repo:", typeScriptRepo?.full_name);
    console.log("Total stars:", totalStars);
    console.log("Most starred repo:", mostStarredRepo?.full_name);
    console.log("Most starred repo stars:", mostStarredRepo?.stargazers_count);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

main();