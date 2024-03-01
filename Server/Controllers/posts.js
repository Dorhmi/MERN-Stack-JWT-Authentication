import Post from "../Models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { postTitle, postContent, userID } = req.body;
        const newPost = new Post({
            postTitle: postTitle,
            postContent: postContent,
            postPicture: req.file.originalname,
            userID: userID,
        });
        // console.log(req.user, userID);
        if (req.user.id === userID) {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } else {
            res.status(403).json("You are not allowed to create this post!");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
export const getUserPosts = async (req, res) => {
    try {
        const { userID } = req.body;
        const normalizedUserID = userID.trim(); // Normalize by removing leading/trailing whitespace

        // Debugging: Log the normalized userID to ensure it's correct
        // console.log("Normalized UserID:", normalizedUserID);

        if (req.user) {
            // console.log("UserID:", userID);
            const allPost = await Post.find({ userID: normalizedUserID });
            // console.log("Query Result:", allPost);
            res.status(200).json(allPost);
        } else {
            // console.log("req.user is falsy");
            res.status(401).send("Unauthorized");
        }
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
