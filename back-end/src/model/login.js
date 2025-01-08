import { decryptedPassWord, resStatus } from "../helper";
import { connectionDb } from "../services/database";
import _ from "lodash";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { user_name, pass_word } = req.body;
    if (!user_name || !pass_word) {
        return res.status(resStatus.error).json({
            success: false,
            message: "Plese check data form",
            data: null,
        });
    }

    const database = await connectionDb();

    const sql = "SELECT * FROM user WHERE user_name = ?";

    try {
        database.query(sql, [user_name], (err, results) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Error",
                });
            }
            if (_.isEmpty(results)) {
                return res.status(200).json({
                    success: false,
                    message: "Account or password is incorrect"
                })
            }
            const passWordDb = results[0]?.pass_word;
            const decryPw = decryptedPassWord(passWordDb);

            if (decryPw === pass_word) {
                const data = results.map(({ id, pass_word, create_at, ...rest }) => rest);

                const token = jwt.sign(data[0], 'your-secret-key', { expiresIn: '30d' });
                
                database.query("UPDATE user SET token=? WHERE user_name = ?", [token, user_name], (errToken, resultToken) => {
                    if (errToken) {
                        console.log("add token false".red, errToken);
                    }
                })

                return res.status(200).json({
                    success: true,
                    message: "Login success full",
                    data: {
                        ...data[0],
                        token
                    }
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Account or password is incorrect"
                })
            }
        });
    } catch (error) {
        console.log("error".red, error);
    }
};
