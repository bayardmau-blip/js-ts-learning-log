import { describe, expect, test } from "bun:test";

import {
  createRepoSummary,
  getRepository,
  GitHubApiError,
  type Fetcher,
  type GitHubRepo,
} from "./github-api";

const sampleRepo: GitHubRepo = {
  id: 1,
  name: "homello-backend",
  full_name: "homello/homello-backend",
  html_url:
    "https://github.com/homello/homello-backend",
  description: "Homello backend service",
  language: "Rust",
  stargazers_count: 25,
  forks_count: 4,
  archived: false,
};

describe("createRepoSummary", () => {
  test("creates the expected summary", () => {
    const result = createRepoSummary(sampleRepo);

    expect(result).toBe(
      "homello/homello-backend | Rust | 25 stars",
    );
  });

  test("uses Unknown when language is null", () => {
    const repoWithoutLanguage: GitHubRepo = {
      ...sampleRepo,
      language: null,
    };

    const result =
      createRepoSummary(repoWithoutLanguage);

    expect(result).toBe(
      "homello/homello-backend | Unknown | 25 stars",
    );
  });
});

describe("getRepository with dependency injection", () => {
  test("returns a valid repository", async () => {
    const fakeFetch: Fetcher = async () =>
      new Response(
        JSON.stringify(sampleRepo),
        {
          status: 200,
        },
      );

    const repo = await getRepository(
      "homello",
      "homello-backend",
      fakeFetch,
    );

    expect(repo).toEqual(sampleRepo);
  });

  test("throws GitHubApiError for a 404 response", async () => {
    const fakeFetch: Fetcher = async () =>
      new Response(
        JSON.stringify({
          message: "Not Found",
        }),
        {
          status: 404,
        },
      );

    let caughtError: unknown;

    try {
      await getRepository(
        "microsoft",
        "missing-repository",
        fakeFetch,
      );
    } catch (error: unknown) {
      caughtError = error;
    }

    expect(caughtError).toBeInstanceOf(
      GitHubApiError,
    );

    if (caughtError instanceof GitHubApiError) {
      expect(caughtError.status).toBe(404);
    }
  });

  test("rejects an invalid response body", async () => {
    const fakeFetch: Fetcher = async () =>
      new Response(
        JSON.stringify({
          unexpected: "shape",
        }),
        {
          status: 200,
        },
      );

    await expect(
      getRepository(
        "homello",
        "homello-backend",
        fakeFetch,
      ),
    ).rejects.toBeInstanceOf(GitHubApiError);
  });
});