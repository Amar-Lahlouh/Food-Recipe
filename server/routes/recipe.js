import express from "express";
import { RecipeAdd, RecAll, RecDel, GetOne } from "../controllers/recipe.js";

const router = express.Router();

router.post("/recadd", RecipeAdd);
router.get("/recall", RecAll);
router.delete("/recdel/:id", RecDel);
router.get("/getone/:id", GetOne);
export default router;
