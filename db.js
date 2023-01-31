const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getAll", (req, res) => {
  try {
    const query = "SELECT * FROM students;";

    let data = connection.query(query, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(data._rows[0]);
      res.json({
        data: data._rows[0],
      });
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

app.listen(process.env.PORT, () => console.log("server is running"));
