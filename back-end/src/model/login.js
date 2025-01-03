import { decryptedPassWord, resStatus } from "../helper";
import { connectionDb } from "../services/database";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

export const login = async (req, res) => {
    const { user_name, pass_word } = req.body;

    if (!user_name || !pass_word) {
        return res.status(resStatus.error).json({
            success: false,
            message: "Plese check data form",
            data: null
        })
    }

    const database = await connectionDb();

    const sql = "SELECT * FROM user WHERE user_name = ?"

    try {
        database.query(sql, [user_name], (err, results) => {
            if (err) {
                return req.status(401).json({
                    success: false,
                    message: "Error"
                })
            }
            const passWordDb = results[0]?.pass_word || ""

            const decryPw = decryptedPassWord(passWordDb)

            if (decryPw === pass_word) {
                const token = jwt.sign({
                    data: results[0]
                }, configDotenv().parsed.KEY_PW, { expiresIn: '30d' });
                // try {
                //     var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VyX25hbWUiOiJhZG1pbjEiLCJwYXNzX3dvcmQiOiJVMkZzZEdWa1gxOUFnVVRpODlQR01haVZSNU90NlRkNmZKbURhUFNrdUg4PSIsInBob25lX251bWJlciI6IjEiLCJhZGRyZXNzIjpudWxsLCJnZW5kZXIiOm51bGwsImZ1bGxfbmFtZSI6bnVsbCwiYWdlIjpudWxsLCJlbWFpbCI6ImJsdWVza3kuYXF1YXJpdXNAZ21haWwuY29tIiwidG9rZW4iOm51bGwsImNyZWF0ZV9hdCI6IjIwMjUtMDEtMDNUMTY6MTY6MTIuMDAwWiJ9LCJpYXQiOjE3MzU5MjE3NzgsImV4cCI6MTczNTkyMTgwOH0.oGVD4leflE3swU8pjmIvTz5LxzfhaEVaWpT8Mv4cWSM', configDotenv().parsed.KEY_PW);
                //     console.log(11112, decoded);
                    
                // } catch(err) {
                //     console.log("error".red,err);
                //   }
                return res.status(200).json({
                    success: true,
                    message: "Login success full",
                    data: results[0],
                    token
                });
            }
        })
    } catch (error) {
        console.log("error".red, error);
    }


}