import { cryptoPassWord, resStatus } from "../helper";
import { connectionDb } from "../services/database";
import { configDotenv } from "dotenv";
var CryptoJS = require("crypto-js");

export const register = async (req, res) => {
  const { user_name, pass_word, phone_number, email, confirm_password } =
    req.body;
  if (
    !user_name ||
    !pass_word ||
    !phone_number ||
    !email ||
    !confirm_password
  ) {
    return res.status(resStatus.error).json({
      success: false,
      message: "Plese check data form",
      data: null,
    });
  }

  if (pass_word !== confirm_password) {
    return res.status(resStatus.error).json({
      success: false,
      message: "Pass word and Confirm password error",
      data: null,
    });
  }

  const database = await connectionDb();
  const createData = async () => {
    const sql =
      "INSERT INTO user(user_name, pass_word, phone_number, email) VALUE (?,?,?,?)";
    const cryptoPw = cryptoPassWord(pass_word);

    await database.query(
      sql,
      [user_name, cryptoPw, phone_number, email],
      (err, results) => {
        if (err) {
          res.status(401).json({
            success: false,
            message: err,
          });
          return console.log(err);
        }

        return res.status(200).json({
          success: true,
          message: "Register success full",
        });
      }
    );
  };
  const sql =
    "SELECT count(*) AS count from user where user_name = ? or phone_number = ?";
  try {
    database.query(sql, [user_name, phone_number], (err, results) => {

      if (results[0].count) {
        return res.status(200).json({
          success: false,
          message: "đã tồn tại",
        });
      } else {
        createData(results[0].count);
      }
    });
  } catch (error) {
    console.log("error".red, error);
  }
};
