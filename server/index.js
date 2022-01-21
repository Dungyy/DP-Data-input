const express = require('express')
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001

require('dotenv').config();

app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const number = req.body.number;
    const inventory = req.body.inventory;
    const shipped = req.body.shipped;
    const received = req.body.received;

    db.query(
    'INSERT INTO data_input (name, number, inventory, shipped, received) VALUES (?,?,?,?,?)', 
    [name, number, inventory, shipped, received], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    }
    );
});

app.get('/data', (req, res) => {
    db.query('SELECT * FROM data_input', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Yay, Your server is running on port ${PORT}`)
});