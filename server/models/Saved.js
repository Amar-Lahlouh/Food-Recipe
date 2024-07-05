import mongoose from "mongoose";
const SavedSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recid: {
    type: mongoose.Schema.Types.ObjectId,
    REF: "Recipe",
    required: true,
  },
});

const Saved = mongoose.model("Saved", SavedSchema);
export default Saved;
