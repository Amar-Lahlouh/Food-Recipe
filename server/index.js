import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { VerifyAdmin } from "./middlewares/VerifyAdmin.js";
import { VerifyAuth } from "./middlewares/VerifyAuth.js";
import AuthRouter from "./routes/auth.js";
import CategoryRouter from "./routes/category.js";
import FrontRouter from "./routes/front.js";
import RecipeRouter from "./routes/recipe.js";
import UserRouter from "./routes/user.js";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server Running on post 3000");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
//hu name file bkun zetu mwjud bl formData
app.post("/server/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  console.log(file);
  res.status(200).json(file?.filename);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "Recipe_Food",
  })
  .then(() => {
    console.log("Database connected");
  });
app.use("/auth", AuthRouter);
app.use("/front", FrontRouter);
app.use(VerifyAuth);
app.use("/user", UserRouter);
app.use(VerifyAdmin);
app.use("/admin/category", CategoryRouter);
app.use("/admin/recipe", RecipeRouter);
