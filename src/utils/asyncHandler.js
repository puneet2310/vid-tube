const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}


export{ asyncHandler }



/* 
1. This code defines
    : a utility function called asyncHandler that helps manage asynchronous request handlers in an Express application.

2. The purpose of asyncHandler is
    : to simplify error handling in asynchronous routes. In Express, if an asynchronous function (like an API route handler) throws an error, it won't automatically be caught by Express, and the server might crash or hang. This utility ensures that any errors that occur in the asynchronous function are passed to the next error-handling middleware.


3. const asyncHandler = (requestHandler) => {
    : This line defines an arrow function named asyncHandler. It takes one parameter, requestHandler, which is expected to be an asynchronous function that handles a request (e.g., an API endpoint).

4. return (req, res, next) => {
    : This line returns another function. This inner function will be the actual middleware that Express calls. It takes three parameters:

        req: The incoming request object.
        res: The response object that will be sent back to the   client.
        next: A function that, when called, will pass control to the next middleware in the stack.

5. Promise.resolve(requestHandler(req, res, next))
    : This line calls the requestHandler function with the req, res, and next parameters and wraps the result in a Promise. This is useful because requestHandler might return a promise (for example, if it involves asynchronous operations like fetching data from a database).




*Summary
    Purpose
        : asyncHandler is a utility to wrap asynchronous route handlers, making error handling easier.
    Parameters
        : It takes a request handler function that performs asynchronous operations.
    Error Handling
        : If an error occurs in the async function, it catches the error and passes it to the next middleware for proper error handling.


*/