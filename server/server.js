const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const login = require("./routes/login");
const signup = require("./routes/signup");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const app = express();
app.use(cookieParser());
app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    "Allow-Methods": "GET, POST, PUT, DELETE",
  })
);

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB가 연결되었습니다!"))
  .catch((err) => console.log(err));

const PORT = 3000;

app.get("/", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  });
  console.log({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  });
});

app.use("/login", login);

app.use("/signup", signup);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
