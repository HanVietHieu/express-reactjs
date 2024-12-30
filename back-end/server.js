import { configDotenv } from "dotenv";
import express from "express";
import color from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routers";
const app = express();
const port = configDotenv().parsed.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// 
app.use("/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("nani".yellow);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
