const mysql = require("mysql2");

// Tạo kết nối
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abcd1234",
  database: "crud",
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 10000,
});

// Kết nối đến MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// const queryDb = async (queryString, functionGetDataDb = () => {}) => {
//   try {
//     await connection.query(queryString, (err, results) => {
//       if (err) {
//         console.error("Error executing query:", err);
//         return;
//       }
//       functionGetDataDb(results);
//       return results;
//     });
//   } catch (error) {
//     return console.log(error.red);
//   }
// };

export { connection };