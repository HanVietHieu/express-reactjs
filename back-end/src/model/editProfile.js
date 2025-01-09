import { connectionDb } from "../services/database";

export const editProfile = async (req, res) => {
    const database = await connectionDb();
    try {
        const {
             user_name, phone_number, email, address, gender, full_name, age
        } = req.body

        const userId = req?.user?.id

            if (!user_name || !phone_number || !email || !full_name) {
                return res.status(400).json({
                    success: false,
                    message: "Plese check data form"
                })
            }

            const handleGetUser = async() => {
                const sql = "SELECT user_name, phone_number, address, gender, full_name, age, email, token, avt, id FROM user WHERE id = ?"
               database.query(sql, [userId], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(401).json({
                            success: false,
                            message: err,
                        });
                    }
                    else{
                        return res.status(200).json({
                            success: true,
                            message: "Update Profile success full",
                            data: result[0]
                        })
                    }
                })
            }

            const sql = "UPDATE user SET user_name=?, phone_number=?, email=?, address=?, gender=?, full_name=?, age=? WHERE id=?"
            database.query(
                sql,
                [user_name, phone_number, email, address, gender, full_name, age, userId],
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