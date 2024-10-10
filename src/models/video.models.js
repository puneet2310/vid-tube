/*
    id string pk
    owner ObjectId users
    videoFile string
    thumbnail string
    title string
    description string
    duration number
    views number
    isPublished boolean
    createdAt Date
    updatedAt Date
*/

import mongoose , { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
mongooseAggregatePaginate

const videoSchema = new Schema(
    {
        owners: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 
        videoFile :{
            type : String,  //cloudinary url
            required: true
        },
        thumbnail :{
            type : String,  //cloudinary url
            required: true
        },
        title :{
            type : String,  
            required: true
        },
        description :{
            type : String,  
        },
        duration :{
            type : Number,  
            required: true
        },
        views :{
            type : Number,  
            default: 0
        },
        isPublished :{
            type : Boolean,  
            default: false
        }
    }, 
    {timestamps: true}
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)