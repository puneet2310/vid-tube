import express from "express"
//This line imports the Express framework, which is a web application framework for Node.js. It simplifies the process of building web servers and APIs by providing features like routing, middleware support, and more.
import cors from "cors"

//This imports the CORS middleware, which stands for Cross-Origin Resource Sharing. CORS is a security feature that allows or restricts resources from being requested from another domain outside the domain from which the resource originated.

import cookieParser from "cookie-parser"

const app = express()
//Here, we create an instance of an Express application. This app object will be used to define routes, middleware, and to start the server.

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

//app.use(...): This method is used to mount middleware functions at a specified path. Middleware functions are functions that have access to the request object, response object, and the next middleware function in the application’s request-response cycle.

//cors({...}): This calls the CORS middleware with specific options:

//1. origin: process.env.CORS_ORIGIN: This specifies which origin(s) are allowed to access the resources. The process.env.CORS_ORIGIN retrieves the allowed origin from environment variables, making it easy to configure for different environments (e.g., development, staging, production).

//2. credentials: true: This option allows cookies and other credentials to be included in cross-origin requests. This is important if your application requires user authentication.


 // common middleware

 app.use(express.json({limit: "16kb"}))
//app.use(express.json({limit: "16kb"})): This middleware parses incoming JSON requests. It converts the request body into a JavaScript object, which can then be accessed in the req.body property. The limit: "16kb" option restricts the size of incoming JSON payloads to 16 kilobytes, helping to protect the server from large payloads that could lead to denial of service attacks.

app.use(express.urlencoded({extended: true, limit: "16kb"}))
//app.use(express.urlencoded({...})): This middleware parses incoming requests with URL-encoded payloads (e.g., form submissions).

//extended: true: This option allows for rich objects and arrays to be encoded into the URL-encoded format. If set to false, the library will use the querystring library instead of the qs library for parsing, which means it can only parse simple data structures.


app.use(express.static("public"))
//app.use(express.static("public")): This middleware serves static files from the public directory. When a request is made for a file (like an HTML, CSS, or JavaScript file), Express will look for it in the specified directory. This is useful for serving assets like images, stylesheets, and scripts without needing to define specific routes for each one.

app.use(cookieParser())

//import route
import healthCheckRouter from "./routes/healthCheck.routes.js"
import userRouter from "./routes/user.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js"

//routes
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/users",userRouter)

// app.use(errorHandler)

export { app }