/*
    id string pk
    username string
    email string
    fullName string
    avatar string
    coverImage string
    watchHistory ObjectId[] videos
    password string
    refreshToken string
    createdAt Date
    updatedAt Date
*/

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
            
        },
        coverImage: {
            type: String,
        }, 
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video" //come from export
            }
        ],
        password: {
            type: String,
            required: [true, "Passowrd is required"], //in bracket there is error message when user is not putting password on frontend

        }, 
        refreshToken:{
            type: String
        }
        
    }, {timestamps : true}
)

//before saving the password.... so we have to use what ?? --> prehook pre()
userSchema.pre("save", async function(next){ // never use here arrow function because we want ot get the context of this

    if(!this.isModified("password")) return next() // if modified filed is not password so dont't encrypt the password
    
    this.password = await bcrypt.hash(this.password, 12) // 12 rounds to encrypt

    next() // it is either passes to next pre hook , next middleware or where it has to be needed to perform
})

//compare the password.... 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// generate jwt tokens

//1. access tokens
userSchema.methods.generateAccessToken = function (){
    //short-lived jwt token
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
}

//2. refresh token that is stored in database-- helps to force logout by user 
userSchema.methods.generateRefreshToken = function (){
    //short-lived jwt token
    return jwt.sign({
        _id: this._id, // refresh tokens have only one field never-ever
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );
}



export const User = mongoose.model("User", userSchema)