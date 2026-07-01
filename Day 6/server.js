// server start krna
// database se connect krna

const app = require("./src/app");

const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://arun:arunkumaryadav@cluster0.5f1x3pl.mongodb.net/day-6",
    )
    .then(() => {
      console.log("Connected to database");
    });
}
connectToDb();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
