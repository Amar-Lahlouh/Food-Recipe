import jwt from "jsonwebtoken";

export const VerifyAdmin = (req, res, next) => {
  console.log("check admin", req.user);
  if (req.user.Role != 1)
    return res.status(401).json({ message: "Unauthorized" });
  next();
};
