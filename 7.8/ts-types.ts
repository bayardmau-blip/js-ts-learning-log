// 7.8
// Exercise TypeScript

export {};

type UserRole = "student" | "landlord" | "admin";
type UserStatus = "active" | "inactive" | "pending";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  city?: string; // optional property
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const userA: User = {
  id: 1,
  name: "A",
  email: "a@example.com",
  role: "student",
  status: "active",
  city: "Paris",
};

const userB: User = {
  id: 2,
  name: "B",
  email: "b@example.com",
  role: "landlord",
  status: "pending",
};

function describeUserRole(role: UserRole): string {
  if (role === "student") {
    return "This user is looking for housing.";
  }

  if (role === "landlord") {
    return "This user provides housing.";
  }

  return "This user manages the platform.";
}

function getUserCity(user: User): string {
  if (user.city) {
    return user.city;
  }

  return "City not provided";
}

function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data: data,
  };
}

const singleUserResponse = createSuccessResponse<User>(userA);
const usersListResponse = createSuccessResponse<User[]>([userA, userB]);

console.log("User A role:", describeUserRole(userA.role));
console.log("User A city:", getUserCity(userA));
console.log("User B city:", getUserCity(userB));
console.log("Single user response:", singleUserResponse);
console.log("Users list response:", usersListResponse);