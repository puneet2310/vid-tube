import mongoose, { MongooseError } from "mongoose";
import { ApiError } from "../utils/Apierror.js";


const errorHandler = (err, req, res, next) => {
    let error = err

    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500

        const message = error.message || "Something went wrong"
        error = new ApiError(statusCode, message, error?.errors || [] , err.stack)
    }


    const response = {
        ...error,
        messagee: error.message, 
        ...ApiError(process.env.NODE_ENV === "development" ? {stack: error.stack } : {})
    }

    return res.status(error.statusCode).json(response)
}

export { errorHandler }