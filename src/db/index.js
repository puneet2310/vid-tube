//1. database gives error ==> solution is -- use try catch block always to handle error
//2. database is always in another continent ==> solution is -- always use async - await 

import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`MONGO DB connected !  DB host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("DB connection errors", error)
        process.exit(1)
    }
}

export default connectDB