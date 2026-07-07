// 7.7
// Exercise TypeScript: Promise and async/await

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function runTask(): Promise<void> {
  try {
    console.log("Task started");

    await wait(1000);

    console.log("Task finished after 1 second");
  } catch (error) {
    console.error("Task failed:", error);
  }
}

function getUserName(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("A");
    }, 1000);
  });
}

async function showUserName(): Promise<void> {
  try {
    console.log("Loading user name...");

    const name = await getUserName();

    console.log("User name:", name);
  } catch (error) {
    console.error("Failed to load user name:", error);
  }
}

runTask();
showUserName();