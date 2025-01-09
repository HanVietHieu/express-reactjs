import { cryptoPassWord, decryptedPassWord } from "../helper";
import { connectionDb } from "../services/database";

export const changePassWord = async (req, res) => {
    try {
        const {
            pass_word, new_pass, confirm_pass
        } = req.body

        if (!pass_word || !new_pass || !confirm_pass) {
            return res.status(200).json({
                success: false,
                data: null,
                message: "Plese check data form"
            })
        }

        if (new_pass !== confirm_pass) {
            return res.status(200).json({
                success: false,
                data: null,
                message: "New password and confirm different password"
            })
        }
        const database = await connectionDb()
        const user = req?.user?.user_name;

        const handleGetPwtoDb = () => {
            const sql = "UPDATE user SET pass_word=? WHERE user_name=?"
            const cryptoPw = cryptoPassWord(new_pass);

            database.query(sql, [cryptoPw, user], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(401).json({
                        success: false,
                        data: null,
                        message: error
                    })
                }

                return res.status(200).json({
                    success: true,
                    message: "Update Password success full",
                });
            })
        }

        database.query("SELECT pass_word FROM user WHERE user_name=?", [user], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(401).json({
                    success: false,
                    data: null,
                    message: error
                })
            }

            if (result[0]?.pass_word) {
                const decryptPw = decryptedPassWord(result[0]?.pass_word)

                if (pass_word !== decryptPw) {

                    return res.status(200).json({
                        success: false,
                        data: null,
                        message: "Password is incorrect"
                    })
                }
                handleGetPwtoDb()
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            data: null,
            message: "Error change password"
        })
    }
}