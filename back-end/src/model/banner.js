import _ from "lodash";
import { connectionDb } from "../services/database";

export const getBanner = async (req, res) => {
    const database = await connectionDb();

    const sql = "SELECT title, description, position, url, is_mobile, is_wap, is_web, start_time, end_time, page_show, content FROM banner WHERE is_delete = 0 AND NOW() BETWEEN start_time AND end_time "

    try {
        database.query(sql, (err, results) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Error",
                });
            }
            if (_.isEmpty(results)) {
                return res.status(200).json({
                    success: false,
                    message: "Get banner false"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Get banner success",
                data: results
            })
        })
    } catch (error) {
        console.log("error".red, error);
    }
}