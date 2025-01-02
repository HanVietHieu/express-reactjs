const mysql = require("mysql2");

// Tạo kết nối
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "abcd1234",
  database: "crud",
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 10000,
};

const connectionDb = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if(err) {
        console.log("error connect db".red,err);
      }
    })
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:'.red, error);
    process.exit(1);
  }
}

export { connectionDb };
