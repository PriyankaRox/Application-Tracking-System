// env files
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// important pacakages
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

// DB connection
require("./db/conn");

// initilizing app and middlewares
const app = express();
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ping server to test if server is woirking or not
app.get("/", (req, res) => {
  res.send({ success: 1, ping: 1 });
});

// application routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/job", require("./routes/job"));
app.use("/auth", require("./routes/auth"));
app.use("/candidate", require("./routes/candidate"));


// PORT and server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App is running on http://localhost:" + PORT);
});
