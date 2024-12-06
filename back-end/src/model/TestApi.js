import { connection } from "../services/database";

export const test_api = async (req, res) => {
  const { id, name } = req.query;
  const sql = "UPDATE user SET userName = ? WHERE id = ?";
  try {
    console.log(name.red);
    await connection.query(sql, [name, id], (err, results) => {
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
