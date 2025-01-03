import { configDotenv } from "dotenv";
import express from "express";
import color from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routers";
var CryptoJS = require("crypto-js");

const app = express();
const port = configDotenv().parsed.PORT || 3036;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/shop-v1", router);

app.get("/", (req, res) => {
  var data = "naniiiii"
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), configDotenv().parsed.KEY_PW).toString();
console.log(1111, ciphertext);
console.log(98,  configDotenv().parsed.KEY_PW);

  // Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, configDotenv().parsed.KEY_PW);
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log(222, decryptedData);

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
