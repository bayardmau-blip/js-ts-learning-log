export const repositories = [
  {
    id: "typescript",
    label: "TypeScript",
    owner: "microsoft",
    repository: "TypeScript",
  },
  {
    id: "react",
    label: "React",
    owner: "facebook",
    repository: "react",
  },
  {
    id: "bun",
    label: "Bun",
    owner: "oven-sh",
    repository: "bun",
  },
] as const;

export type RepositoryId =
  (typeof repositories)[number]["id"];

export type RepositoryOption =
  (typeof repositories)[number];