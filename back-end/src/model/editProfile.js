import { TYPE_EDIT_PROFILE } from "../helper"
import { connectionDb } from "../services/database";
import jwt from 'jsonwebtoken';

export const editProfile = async (req, res, next) => {
    const authHeader = req.headers['authorization'];


    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // return res.status(401).json({
        //     success: "false"
        // }); // Không có token, trả về 401 Unauthorized
    }
    jwt.verify(token, "your-secret-key", (err, user) => {
        // if (err) return res.sendStatus(403);
        req.user = user; // Gán thông tin user vào request
        next(); // Tiếp tục xử lý request
    })

    const {
        type, user_name, pass_word, phone_number, email, confirm_password, address, gender, full_name, avt, age
    } = req.body

    const user = req.user.user_name
    const database = await connectionDb();
    if (+type === TYPE_EDIT_PROFILE.profile) {
        if (!user_name || !phone_number || !email || !full_name) {
            // return res.status(401).json({
            //     success: false,
            //     message: "Plese check data form"
            // })
        }

        const sql = "UPDATE user SET user_name=?, phone_number=?, email=?, address=?, gender=?, full_name=?, age=? WHERE user_name=?"
    const datasss =  await  database.query(
            sql,
            [user_name, phone_number, email, address, gender, full_name, age, user],
            (err, results) => {
                console.log(111, err);
                console.log(222, results);
                
                

                if (err) {
                    console.log(err);

                    // return res.status(401).json({
                    //     success: false,
                    //     message: err,
                    // });
                }

                return true
                // else {
                //     console.log(333);
                //     return res.status(200).json({
                //         success: true,
                //         message: "Update Profile success full",
                //     })
                // }
                
            }
        )
    }
    console.log(444, datasss);
    
   
}