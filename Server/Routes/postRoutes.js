import express from "express";
import { verifyToken } from "../Middleware/Verify.js";
import upload from "../Middleware/Multer.js";
import { createPost, getUserPosts, removePost } from "../Controllers/posts.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", upload.single("picture"), createPost);
router.get("/userPosts", getUserPosts);
router.delete("/delete/:id", removePost);

export default router;
