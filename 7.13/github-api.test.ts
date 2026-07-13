import {
  afterEach,
  describe,
  expect,
  mock,
  spyOn,
  test,
} from "bun:test";

import {
  createRepoSummary,
  getRepository,
  GitHubApiError,
  type GitHubRepo,
} from "./github-api";

const sampleRepo: GitHubRepo = {
  id: 1,
  name: "homello-backend",
  full_name: "homello/homello-backend",
  html_url: "https://github.com/homello/homello-backend",
  description: "Homello backend service",
  language: "Rust",
  stargazers_count: 25,
  forks_count: 4,
  archived: false,
};

afterEach(() => {
  mock.restore();
});

describe("createRepoSummary", () => {
  test("creates the expected repository summary", () => {
    const result = createRepoSummary(sampleRepo);

    expect(result).toBe(
      "homello/homello-backend | Rust | 25 stars",
    );
  });

  test("uses Unknown when repository language is null", () => {
    const repoWithoutLanguage: GitHubRepo = {
      ...sampleRepo,
      language: null,
    };

    const result = createRepoSummary(repoWithoutLanguage);

    expect(result).toContain("Unknown");
  });
});

describe("getRepository (mocked fetch)", () => {
  test("returns a parsed GitHubRepo on success", async () => {
    spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(sampleRepo), {
        status: 200,
      }),
    );

    const repo = await getRepository(
      "homello",
      "homello-backend",
    );

    expect(repo).toEqual(sampleRepo);
  });

  test("throws a GitHubApiError with status 404", async () => {
    spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ message: "Not Found" }),
        {
          status: 404,
        },
      ),
    );

    let caughtError: unknown;

    try {
      await getRepository(
        "microsoft",
        "missing-repository",
      );
    } catch (error: unknown) {
      caughtError = error;
    }

    expect(caughtError).toBeInstanceOf(GitHubApiError);

    if (caughtError instanceof GitHubApiError) {
      expect(caughtError.status).toBe(404);
    }
  });

  test(
    "throws a GitHubApiError for an invalid response body",
    async () => {
      spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(
          JSON.stringify({ unexpected: "shape" }),
          {
            status: 200,
          },
        ),
      );

      await expect(
        getRepository("homello", "homello-backend"),
      ).rejects.toBeInstanceOf(GitHubApiError);
    },
  );
});

const runIntegrationTests =
  process.env.RUN_GITHUB_INTEGRATION === "1";

describe("GitHub API integration (real network)", () => {
  test.if(runIntegrationTests)(
    "returns the Microsoft TypeScript repository",
    async () => {
      const repo = await getRepository(
        "microsoft",
        "TypeScript",
      );

      expect(repo.name).toBe("TypeScript");
      expect(repo.full_name).toBe(
        "microsoft/TypeScript",
      );
      expect(repo.archived).toBe(false);
    },
    10_000,
  );

  test.if(runIntegrationTests)(
    "throws a 404 GitHubApiError for a missing repository",
    async () => {
      let caughtError: unknown;

      try {
        await getRepository(
          "microsoft",
          "missing-repository-bayard",
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
    },
    10_000,
  );
});