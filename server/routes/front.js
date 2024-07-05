import express from "express";
import {
  CatAll,
  GetRec,
  GetDetails,
  AddReview,
  AllReview,
  Savedd,
  isSaved,
  getSaved,
} from "../controllers/front.js";
import { VerifyAuth } from "../middlewares/VerifyAuth.js";
const router = express.Router();
router.get("/catall", CatAll);
router.get("/getrec", GetRec);
router.get("/getdetails/:id", GetDetails);
router.post("/addreview/:id", AddReview);
router.get("/allreview/:id", AllReview);
router.use(VerifyAuth);
router.post("/saved/:id", Savedd);
router.post("/isSaved/:id", isSaved);
router.post("/getSaved", getSaved);
export default router;
