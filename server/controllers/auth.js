import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Signup = async (req, res) => {
  const { Name, Email, Password, ConfirmPassword, Phone, Age } = req.body;

  if (!Name | !Email | !Password | !ConfirmPassword | !Phone | !Age)
    return res.status(401).json({ message: "All Fields Are Required!" });

  if (Password != ConfirmPassword)
    return res.status(401).json({ message: "Passwords Doesn't Match!" });

  try {
    const u = await User.findOne({ Email });
    if (u) return res.status(401).json({ message: "User Already Exists" });
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = new User({
      Name: Name,
      Email: Email,
      Password: hashedPassword,
      Phone: Phone,
      Role: 2,
      Age: Age,
    });

    await user.save();
    return res.status(200).json("Inserted Successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const Login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email | !Password)
    return res.status(401).json({ message: "All Fields  are Required!" });

  try {
    const user = await User.findOne({ Email });

    if (!user) return res.status(401).json({ message: "User Doesn't Exist" });

    const passwordcheck = bcrypt.compare(Password, user.Password);
    if (!passwordcheck)
      return res.status(401).json({ message: "Passwords Doesn't Match" });

    // Create Token
    console.log("userfirst", user);
    const accessToken = jwt.sign(
      { userid: user._id, Role: user.Role },
      "jwt-access-token-secret-key",
      {
        expiresIn: "1d",
      }
    );
    console.log("accesstoken", accessToken);

    const refreshToken = jwt.sign(
      {
        userid: user._id,
        Role: user.Role,
      },
      "jwt-refresh-token-secret-key",
      {
        expiresIn: "7d",
      }
    );
    console.log("refresh token", refreshToken);
    // Save them in cookies
    res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({ user });

    // signup , all field required passwords matches w user already or no then bcryp password then send it
    // login all fields required , user exists, password correct, then do token
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const Logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json("User has been logged out.");
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  // console.log("req.cookies", req.cookies);

  if (!refreshToken) return res.json({ valid: false, message: "No Token" });

  jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
    if (err) return res.json({ valid: false, message: "INVALID" });
    delete decoded.iat;
    delete decoded.exp;
    const newAccessToken = jwt.sign(decoded, "jwt-access-token-secret-key", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(decoded, "jwt-refresh-token-secret-key", {
      expiresIn: "7d",
    });
    res.cookie("accessToken", newAccessToken, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({ valid: true });
  });
};
