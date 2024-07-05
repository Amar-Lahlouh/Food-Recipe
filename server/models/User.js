import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Role: {
    type: Number,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
