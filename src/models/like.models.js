/*
    id string pk
    video ObjectId videos
    comment ObjectId comments
    tweet ObjectId tweets
    likedBy ObjectId users
    createdAt Date
    updatedAt Date
*/

import  mongoose , { Schema }  from "mongoose";

const likeSchema = new Schema(
    {
        videos: {
            type: Schema.Types.ObjectId,
            ref : "Video"
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref : "Comment"
        },
        tweets: {
            type: Schema.Types.ObjectId,
            ref : "Tweet"
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref : "User"
        },
    }, {timestamps: true}
)

export const Like = mongoose.model("Like", likeSchema)