import express from "express";
import { logout, register } from "../Controllers/auth.js";
import { login } from "../Controllers/auth.js";
import { refresh } from "../Controllers/auth.js";
import upload from "../Middleware/Multer.js";

const router = express.Router();

router.post("/register", upload.single("picture"), register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
