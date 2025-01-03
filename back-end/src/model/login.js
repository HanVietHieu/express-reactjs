import { decryptedPassWord, resStatus } from "../helper";
import { connectionDb } from "../services/database";

export const login = async (req, res) => {
    const { user_name, pass_word } = req.body;
    console.log("nani12".red, pass_word);
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
            const  passWordDb = results[0]?.pass_word
            console.log(11111111111112, results[0]);

            const decryPw = decryptedPassWord(passWordDb)

            if (decryPw === pass_word) {
               return res.status(200).json({
                    success: true,
                    message: "Login success full",
                });
            }
            console.log("nani".red, decryPw);
            console.log("nani2".red, pass_word);
            console.log(decryPw === pass_word);
            
            

        })
    } catch (error) {
        console.log("error".red, error);

    }


}