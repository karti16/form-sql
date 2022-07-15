const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const randomData = require('./randomData').randomData;

//create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studentsForm',
});

//Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
});

const app = express();

app.use(cors());
app.use(express.json());

//create db
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE studentsForm';
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send('Database created...');
  });
});

//create Table
app.get('/creattable', (req, res) => {
  let sql =
    'CREATE TABLE `studentsForm`.`students_table` ( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY , `fullName` TEXT NOT NULL , `email` TEXT NOT NULL , `phone` TEXT NOT NULL , `department` TEXT NOT NULL , `dateOfBirth` DATE NOT NULL , `projectName` TEXT NOT NULL , `projectSubmit` TEXT NOT NULL , `vaccinationFirstDose` TEXT NULL DEFAULT NULL , `vaccinationSecondDose` TEXT NULL DEFAULT NULL ) ENGINE = InnoDB';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('POST table created');
  });
});

//add Form Data
app.post('/addData', (req, res) => {
  let data = req.body;

  let sql = 'INSERT INTO students_table SET ?';

  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('Form data added');
  });
});

//Get all Form Data
app.get('/getData', (req, res) => {
  let sql = 'SELECT * FROM students_table ORDER BY id DESC';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
  });
});

//Delete specific post
app.get('/deletePost/:id', (req, res) => {
  let sql = `DELETE FROM students_table WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//Delete All post
app.get('/deleteAllPost', (req, res) => {
  let sql = `DELETE FROM students_table`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Input random Data
app.get('/addRandomData', (req, res) => {
  let data = randomData.map((item) => [
    item.fullName,
    item.email,
    item.phone,
    item.department,
    item.dateOfBirth,
    item.projectName,
    item.projectSubmit,
    item.vaccinationFirstDose,
    item.vaccinationSecondDose,
  ]);

  console.log(data);

  let sql = `INSERT INTO students_table( fullName, email, phone, department, dateOfBirth, projectName, projectSubmit, vaccinationFirstDose, vaccinationSecondDose) VALUES ?`;

  db.query(sql, [data], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Form data added');
  });
});

//Update post
app.post('/updateData', (req, res) => {
  let data = req.body;
  let sql = `UPDATE students_table SET  ? WHERE id = ${data.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('Post ID 1 updated');
  });
});
//// Test ////////////////////

//select all posts - fetch all posts
app.get('/getpost', (req, res) => {
  let sql = 'SELECT * FROM posts';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('Post fetched');
  });
});

//SELECT sinlge post
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('Post fetched ID 1');
  });
});

//Update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('Post ID 1 updated');
  });
});

//Delete post
app.get('/deletePost/:id', (req, res) => {
  let sql = `DELETE FROM students_tble WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('Post ID 1 deleted');
  });
});

app.listen('3005', () => {});

//CREATE TABLE `studentsForm`.`students_table` ( `id` INT NOT NULL AUTO_INCREMENT , `fullName` TEXT NOT NULL , `email` TEXT NOT NULL , `phone` TEXT NOT NULL , `department` TEXT NOT NULL , `dateOfBirth` DATE NOT NULL , `projectName` TEXT NOT NULL , `projectSubmit` TEXT NOT NULL , `vaccinationFirstDose` TEXT NULL DEFAULT NULL , `vaccinationSecondDose` TEXT NULL DEFAULT NULL ) ENGINE = InnoDB;
