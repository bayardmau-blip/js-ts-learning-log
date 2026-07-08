"use strict";
// 7.8 Exercise TypeScript: fetch API with async/await
// Define an async function getUser that takes a user ID and returns a Promise of ApiUser
async function getUser(id) {
    //Send an HTTP GET request to the API endpoint using fetch
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    // Check whether the HTTP response is successful
    if (!response.ok) {
        throw new Error(`Failed to fetch user. Status: ${response.status}`);
    }
    // Convert the response body from JSON into a JavaScript object
    // response.json() is also asynchronous, so we use await again
    const user = await response.json();
    return user;
}
// Main function asynchronous function to demonstrate the usage of getUser
async function main() {
    try {
        const user = await getUser(4);
        console.log("User name:", user.name);
        console.log("Email:", user.email);
        console.log("City:", user.address.city);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        else {
            console.error("Unknown error:", error);
        }
    }
}
main();
