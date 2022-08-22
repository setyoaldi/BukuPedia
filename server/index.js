const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const chatRouter = require("./routes/chat");

const app = express();
const port = process.env.PORT;
const MONGGODB_URL = process.env.REACT_APP_MONGODB_CONNECT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// API
app.use("/users", userRouter);
app.use("/book", bookRouter);
app.use("/chat", chatRouter);

// Connect Monggo.DB
mongoose
  .connect(MONGGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not match`));
