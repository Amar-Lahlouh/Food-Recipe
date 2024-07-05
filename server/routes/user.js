import express from "express";
import { VerifyAuth } from "../middlewares/VerifyAuth.js";
import { GetMe, GetUser, UserUp } from "../controllers/user.js";
const router = express.Router();
router.use(VerifyAuth);
router.get("/me", GetMe);
router.get("/getuser", GetUser);
router.put("/userup", UserUp);
export default router;
