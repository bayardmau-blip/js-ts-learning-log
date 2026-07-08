// 7.8
// Exercise TypeScript: fetch API with async/await

export {};

// Define the expected shape of the API user data
interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

// Define an async function getUser
async function getUser(id: number): Promise<ApiUser> {
  // Send an HTTP GET request to the API endpoint
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  // Check whether the HTTP response is successful
  if (!response.ok) {
    throw new Error(`Failed to fetch user. Status: ${response.status}`);
  }

  // Convert the response body from JSON into a JavaScript object
  // response.json() is also asynchronous, so we use await again
  const user = (await response.json()) as ApiUser;

  return user;
}

// Main asynchronous function to demonstrate the usage of getUser
async function main(): Promise<void> {
  try {
    const user = await getUser(4);

    console.log("User name:", user.name);
    console.log("Email:", user.email);
    console.log("City:", user.address.city);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

main();