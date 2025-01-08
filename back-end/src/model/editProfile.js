import { TYPE_EDIT_PROFILE } from "../helper"
import { connectionDb } from "../services/database";

export const editProfile = async (req, res) => {
    try {
        const {
            type, user_name, pass_word, phone_number, email, confirm_password, address, gender, full_name, avt, age
        } = req.body

        const user = req?.user?.user_name
        const database = await connectionDb();

            if (!user_name || !phone_number || !email || !full_name) {
                return res.status(400).json({
                    success: false,
                    message: "Plese check data form"
                })
            }

            const handleGetUser = () => {
                const sql = "SELECT * FROM user WHERE user_name = ?"
                database.query(sql, [user], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(401).json({
                            success: false,
                            message: err,
                        });
                    }
                    else{
                        const data = result.map(({ id, pass_word, create_at, ...rest }) => rest);
                        return res.status(200).json({
                            success: true,
                            message: "Update Profile success full",
                            data: data[0]
                        })
                    }
                })
            }

            const sql = "UPDATE user SET user_name=?, phone_number=?, email=?, address=?, gender=?, full_name=?, age=? WHERE user_name=?"
            database.query(
                sql,
                [user_name, phone_number, email, address, gender, full_name, age, user],
                (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(401).json({
                            success: false,
                            message: err,
                        });
                    }

                    else {
                        handleGetUser()
                        
                    }

                }
            )
        }

    catch (error) {
        console.error("Error in editProfile:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}