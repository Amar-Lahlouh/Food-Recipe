import express from "express";
import { Signup, Login, refreshToken, Logout } from "../controllers/auth.js";

const router = express.Router();
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/refresh", refreshToken);
router.post("/logout", Logout);
export default router;
