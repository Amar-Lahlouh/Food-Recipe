import Category from "../models/Category.js";
import Recipe from "../models/Recipe.js";
import Reviews from "../models/Reviews.js";
import Saved from "../models/Saved.js";
import User from "../models/User.js";

export const CatAll = async (req, res) => {
  try {
    const cat = await Category.find({});
    return res.status(200).json(cat);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const GetRec = async (req, res) => {
  try {
    const rec = await Recipe.find({}).populate("Catid");
    return res.status(200).json(rec);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const GetDetails = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);

  try {
    const rec = await Recipe.findById(id);
    return res.status(200).json(rec);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const AddReview = async (req, res) => {
  const recid = req.params.id;

  const { Text, userid } = req.body;

  try {
    const review = new Reviews({ recid: recid, userid: userid, Text: Text });
    await review.save();
    return res
      .status(200)
      .json({ message: "Review Inserted Successfully", review });
  } catch (err) {
    console.log(err);
  }
};

export const AllReview = async (req, res) => {
  try {
    let id = req.params.id;

    const rec = await Reviews.find({ recid: id }).populate("userid");

    return res.status(200).json(rec);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const Savedd = async (req, res) => {
  const recid = req.params.id;
  const { userid } = req.body;

  // bchuf iza m3mol save aw la iza m3mol byn3mlo pull w iza la f push
  try {
    const user = await User.findById(userid);

    if (user.savedRecipes.includes(recid)) {
      user.savedRecipes.pull(recid);
    } else {
      user.savedRecipes.push(recid);
    }
    await user.save();
    const isSaved = user.savedRecipes.includes(recid);
    return res.status(200).json({ saved: isSaved });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const isSaved = async (req, res) => {
  const recid = req.params.id;
  const { userid } = req.body;
  console.log(userid, "userid");
  console.log("recid", recid);
  try {
    const user = await User.findById(userid);

    // if (!user) return res.status(404).json({ message: "User not found" });
    console.log("is saved", user);
    const isSaved = user.savedRecipes.includes(recid);
    console.log("is saved", isSaved);
    //yaane useeffect b3ml hun iza fe id bl saved yane mtsyv iza la f false
    return res.status(200).json({ saved: isSaved });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getSaved = async (req, res) => {
  const { userid } = req.body;

  try {
    const user = await User.findById(userid).populate("savedRecipes");
    return res.status(200).json(user.savedRecipes);
  } catch (err) {
    return res.status(500).json(err);
  }
};
