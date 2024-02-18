import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        postTitle: {
            type: String,
            require: true,
        },
        postContent: {
            type: String,
            require: true,
        },
        postPicture: {
            type: String,
        },
        userID: {
            Type: String,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
