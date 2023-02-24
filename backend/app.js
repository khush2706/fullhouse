const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const verifyToken = require("./middleware/validateToken");

dotenv.config();

// app.use(cors());
app.use(express.json());

// connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.error(err));

//import routes
const authRoutes = require("./routes/auth");

// route middlewares
app.use("/api/user", authRoutes);

app.listen(1337, () => {
  console.log("listening on port 1337");
});
