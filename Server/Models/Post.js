import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        postTitle: {
            type: String,
            required: true,
        },
        postContent: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
        },
        postPicture: {
            type: String,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
