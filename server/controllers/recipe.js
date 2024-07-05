import Recipe from "../models/Recipe.js";

export const RecipeAdd = async (req, res) => {
  const { Name, NbrCal, NbrIng, NbrMin, Ing, Details, img, catid } = req.body;

  if (!Name | !NbrCal | !NbrIng | !NbrMin | !Ing | !Details | !img | !catid)
    return res.status(401).json({ message: "All Fields Required!" });

  try {
    const rec = new Recipe({
      Name: Name,
      NbrCal: NbrCal,
      Catid: catid,
      NbrIng: NbrIng,
      NbrMin: NbrMin,
      Ing: Ing,
      Details,
      Img: img,
    });

    await rec.save();
    res.status(200).json({ message: "Recipe Added Successfully!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const RecAll = async (req, res) => {
  try {
    const rec = await Recipe.find({}).populate("Catid");
    console.log(rec);
    res.status(200).json(rec);
  } catch {
    return res.status(500).json(err);
  }
};

export const RecDel = async (req, res) => {
  const id = req.params.id;
  try {
    const rec = await Recipe.findByIdAndDelete(id).exec();
    res.status(200).json({ message: "Recipe Deleted Successfully!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const GetOne = async (req, res) => {
  const id = req.params.id;

  try {
    const rec = await Recipe.findById(id).populate("Catid");
    return res.status(200).json(rec);
  } catch (err) {
    return res.status(500).json(err);
  }
};
