import jwt from 'jsonwebtoken';
import { User } from "../models/user.models.js";
import { ApiError } from '../utils/Apierror.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const verifyJWT = asyncHandler(async (req, _, next) => {
    
    const token =  req.cookies.accessToken || req.header("Authorization").replace("Bearer ", "")

    if(!token) {
        throw new ApiError(401, "You are not authenticated")
    }
    
    try {
        const decodedToken =jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken") 

        if(!user){
            throw new ApiError(401, "You are not authenticated")
        }

        req.user = user

        next() // this will bw responsible for miving to next middlewware or at the end of the request

    } catch (error) {
        console.log("Error while verifying token", error)
        throw new ApiError(401, "Invalid access token")
    }
})