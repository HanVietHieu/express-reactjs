import { configDotenv } from "dotenv";
var CryptoJS = require("crypto-js");

export const resStatus = {
  ok: 200, //Yêu cầu thành công (ví dụ: res.status(200).send("Success")).
  error: 400, //Yêu cầu không hợp lệ (ví dụ: res.status(400).json({ error: "Invalid data" })).
  errorAuthen: 401, //Yêu cầu cần xác thực (ví dụ: res.status(401).send("Authentication required")).
  errorServer: 500,
};

export const cryptoPassWord = (param) => {
  const cryptoPw = CryptoJS.AES.encrypt(JSON.stringify(param), configDotenv().parsed.KEY_PW).toString();
  return cryptoPw;
}

export const decryptedPassWord = (param) => {
  var bytes  = CryptoJS.AES.decrypt(param, configDotenv().parsed.KEY_PW);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}