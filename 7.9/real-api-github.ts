// 7.9
// Exercise TypeScript

export {};

interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
}

async function getRepository(
  owner: string,
  repo: string
): Promise<GitHubRepoResponse> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "typescript-fetch-practice",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repository. Status: ${response.status}`);
  }

  const data = (await response.json()) as GitHubRepoResponse;

  return data;
}

async function main(): Promise<void> {
  try {
    const repo = await getRepository("microsoft", "TypeScript");

    console.log("Repository:", repo.full_name);
    console.log("Name:", repo.name);
    console.log("Description:", repo.description);
    console.log("Language:", repo.language);
    console.log("Stars:", repo.stargazers_count);
    console.log("Forks:", repo.forks_count);
    console.log("Open issues:", repo.open_issues_count);
    console.log("URL:", repo.html_url);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

main();