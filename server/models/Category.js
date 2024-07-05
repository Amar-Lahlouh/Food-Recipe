import mongoose from "mongoose";
const CategorySchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
