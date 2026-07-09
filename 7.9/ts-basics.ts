// 7.9
// Exercise TypeScript

export {};

interface User {
  id: number;
  name: string;
  email: string;
}

// Type guard function
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as User;

  return (
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}

const dataFromOutside: unknown = {
  id: 1,
  name: "A",
  email: "a@example.com",
};

if (isUser(dataFromOutside)) {
  console.log("Valid user:", dataFromOutside.name);
} else {
  console.log("Invalid user data");
}

const badData: unknown = {
  id: "wrong-id",
  name: "B",
  email: "b@example.com",
};

if (isUser(badData)) {
  console.log("Valid user:", badData.name);
} else {
  console.log("Invalid user data");
}