import mongoose from "mongoose";

const RecipeScehma = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  NbrIng: {
    type: Number,
    required: true,
  },
  NbrCal: {
    type: String,
    required: true,
  },
  NbrMin: {
    type: String,
    required: true,
  },
  Catid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  Ing: {
    type: String,
    required: true,
  },
  Details: {
    type: String,
    required: true,
  },
  Img: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", RecipeScehma);
export default Recipe;
