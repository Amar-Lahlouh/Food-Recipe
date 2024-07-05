import Category from "../models/Category.js";

export const CategoryAdd = async (req, res) => {
  const { Name, img } = req.body;
  try {
    if (!Name || !img)
      return res.status(400).json({ message: "All Fields Are Required" });
    const cat = new Category({ Name: Name, img: img });
    await cat.save();
    return res.status(200).json({ message: "Category Inserted Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const AllCat = async (req, res) => {
  try {
    const allcat = await Category.find({});
    return res.status(200).json(allcat);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const CategoryDelete = async (req, res) => {
  const id = req.params.id;

  try {
    await Category.findByIdAndDelete(id).exec();
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const CatOne = async (req, res) => {
  const id = req.params.id;

  try {
    const cat = await Category.findById(id);
    return res.status(200).json(cat);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const CatUp = async (req, res) => {
  const id = req.params.id;
  const { Name, img } = req.body;

  try {
    const newcat = await Category.findById(id);
    newcat.Name = Name;
    newcat.img = img;
    await newcat.save();
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
