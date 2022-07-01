const mongoose = require("mongoose");
const DbUrl = process.env.DATABASE;
mongoose
  .connect(DbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });
