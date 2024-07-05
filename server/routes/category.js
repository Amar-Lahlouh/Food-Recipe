import express from "express";
import {
  CategoryAdd,
  AllCat,
  CategoryDelete,
  CatOne,
  CatUp,
} from "../controllers/category.js";

const router = express.Router();
router.post("/catadd", CategoryAdd);
router.get("/catget", AllCat);
router.delete("/catdel/:id", CategoryDelete);
router.get("/catone/:id", CatOne);
router.put("/catup/:id", CatUp);
export default router;
