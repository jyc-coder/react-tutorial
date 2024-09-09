const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const { auth } = require("./middleware/auth");
const app = express();

const PORT = 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB 연결 성공!");
    app.use(
      cors({
        "Access-Control-Allow-Origin": "*",
        "Allow-Methods": "GET, POST, PUT, DELETE",
      })
    );
    app.use(express.json());
    app.use(auth);
    app.use("/users", userRouter);

    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => console.log(err));
