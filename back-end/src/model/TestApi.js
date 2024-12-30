import { connection } from "../services/database";

export const test_api = async (req, res) => {
  const { id, name } = req.query;
  const sql = "UPDATE user SET userName = ? WHERE id = ?";
  try {
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

export const test_get_api = async (req, res) => {
  // const {id} = req.query;
  // console.log(id, 11111111111);
  console.log(11111111111111);
  
  // try {
  //   var query = "SELECT * FROM 'user'";
  //   const results = await connection.query(query);
  //   return res.status(200).json({
  //     success: true,
  //     data: results,
  //   });
  //   console.log(1,results); // results contains rows returned by server
  //   console.log(2, fields); // fields contains extra meta data about results, if available
  // } catch (err) {
  //   console.log(err);
  // }
}