import jwt from "jsonwebtoken";
export const VerifyAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return console.log("Token", token);
  jwt.verify(token, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
};
