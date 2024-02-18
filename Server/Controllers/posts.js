import Post from "../Models/Post.js";

export const createPost = async (req, res) => {
    try {
        res.status(200).json("createPost");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
export const getUserPosts = async (req, res) => {
    try {
        res.status(200).json("getUserPosts");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
export const removePost = async (req, res) => {
    try {
        res.status(200).json("removePost");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
