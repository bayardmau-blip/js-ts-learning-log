// 7.7
// Exercise TypeScript:

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  isActive: boolean;
  score: number;
}

const users: User[] = [
  {
    id: 1,
    name: "A",
    email: "A@example.com",
    city: "Paris",
    isActive: true,
    score: 88,
  },
  {
    id: 2,
    name: "B",
    email: "B@example.com",
    city: "Berlin",
    isActive: false,
    score: 72,
  },
  {
    id: 3,
    name: "C",
    email: "C@example.com",
    city: "Zurich",
    isActive: true,
    score: 95,
  },
  {
    id: 4,
    name: "D",
    email: "D@example.com",
    city: "Milan",
    isActive: true,
    score: 81,
  },
  {
    id: 5,
    name: "E",
    email: "E@example.com",
    city: "Barcelona",
    isActive: false,
    score: 78,
  },
];

// Get all user names using map
const names = users.map((user) => user.name);
console.log("Names:", names);

// filter active users
const activeUsers = users.filter((user) => user.isActive);
console.log("Active users:", activeUsers);

// Find specific user by id
const selectedUser = users.find((user) => user.id === 3);
console.log("Selected user:", selectedUser);

// Get specific information of filtered users
const activeUserEmails = users
  .filter((user) => user.isActive)
  .map((user) => user.email);

console.log("Active user emails:", activeUserEmails);

const totalScore = users.reduce((sum, user) => sum + user.score, 0);
const averageScore = totalScore / users.length;

console.log("Average score:", averageScore);


// Exercise functions in TypeScript (filter, find, map, reduce)

function getActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive);
}

function getUserById(users: User[], id: number): User | undefined {
  return users.find((user) => user.id === id);
}

function getAverageScore(users: User[]): number {
  const totalScore = users.reduce((sum, user) => sum + user.score, 0);
  return totalScore / users.length;
}

function getUsersByCity(users: User[], city: string): User[] {
  return users.filter((user) => user.city === city);
}

function getHighScoreUsers(users: User[], minScore: number): User[] {
  return users.filter((user) => user.score >= minScore);
}

console.log("Function - active users:", getActiveUsers(users));
console.log("Function - user by id:", getUserById(users, 2));
console.log("Function - average score:", getAverageScore(users));
console.log("Paris users:", getUsersByCity(users, "Paris"));
console.log("High score users:", getHighScoreUsers(users, 85));