import User from "../models/User.js";
export const GetMe = async (req, res) => {
  const userid = req.user?.userid;
  try {
    const user = await User.findById(userid).lean();
    delete user.Password;
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetUser = async (req, res) => {
  const id = req.user?.userid;

  try {
    const user = await User.findById(id).lean();
    delete user.Password;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const UserUp = async (req, res) => {
  const { user } = req.body;

  const id = req.user?.userid;
  try {
    const userr = await User.findById(id);
    userr.Name = user.Name;
    userr.Phone = user.Phone;
    userr.Age = user.Age;
    await userr.save();
    return res.status(200).json(userr);
  } catch (err) {
    return res.status(500).json(err);
  }
};
