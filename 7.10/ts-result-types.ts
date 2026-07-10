// 7.10
// Exercise TypeScript
export {};

type ApiResult<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      message: string;
    };

interface User {
  id: number;
  name: string;
  email: string;
}

function createSuccessResult<T>(data: T): ApiResult<T> {
  return {
    status: "success",
    data: data,
  };
}

function createErrorResult<T>(message: string): ApiResult<T> {
  return {
    status: "error",
    message: message,
  };
}

function handleUserResult(result: ApiResult<User>): void {
  if (result.status === "success") {
    console.log("User name:", result.data.name);
    console.log("User email:", result.data.email);
  } else {
    console.error("Error:", result.message);
  }
}

const goodUser: User = {
  id: 1,
  name: "A",
  email: "a@example.com",
};

const successResult = createSuccessResult<User>(goodUser);
const errorResult = createErrorResult<User>("User not found");

handleUserResult(successResult);
handleUserResult(errorResult);