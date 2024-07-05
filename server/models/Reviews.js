import mongoose from "mongoose";
const ReviewSchema = mongoose.Schema({
  Text: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  recid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Recipe",
  },
});

const Reviews = mongoose.model("Reviews", ReviewSchema);
export default Reviews;
