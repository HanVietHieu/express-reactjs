import { configDotenv } from "dotenv";
import express from "express";
import color from "colors"
const app = express();
const port = configDotenv().parsed.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("nani".yellow);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
