



const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const { StreamChat } = require('stream-chat');
const ChatGptController = require('./chatGpt.controller')



const crypto = require('crypto');
require("dotenv").config();



const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  // Configure your email service provider here
  service: 'gmail',
  auth: {
    user: 'windowsandguttersautomated@gmail.com', // Your email address
    pass: 'moul skxs rxgb iykt' // Your email password or app-specific password for Gmail
  }
});



function generateToken() {
  return crypto.randomBytes(20).toString('hex'); // Generate a 40-character hex string
}


const app = express();
const port = 2000; // or any port of your choice

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jack5225",
  database: "hackathon_project"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error: " + err.message);
  } else {
    console.log("Connected to the database");
  }
});

const serverSideClient = new StreamChat(
    'aws64qwz4v5n',
    'pjsqvb6ep6rvf5exgbzb2wbzjcfqqtedst92d3ch8rjnjewqgw7sedgx89e4j4h5'
  )


  app.post('/ask-to-chat-gpt', ChatGptController.askToChatGpt)
app.get('/join', async (req, res) => {
    const { username } = req.query

    console.log(username);
  
    // generate Stream Chat token to use to authenticate user on the client
    const token = serverSideClient.createToken(username)
  
    return res.status(200).json({ user: { username }, token })
  })

app.get('/getRoomTypes', (req, res) => {
  // Retrieve username and password from the request body
  

  const sql = "SELECT name FROM roomtype";

  db.query(sql, [], (err, results) => {
    if (err) {
      console.log(err)
      console.log("ERROR")
        res.status(500).json({ error: 'Database error' });
    } else {
        
            // Valid login
            res.status(200).json({ results });

    }

    
});

});


app.get('/getRooms', (req, res) => {
  // Retrieve username and password from the request body
  const { typeID } = req.query;
  const sql = "SELECT a.ID, JSON_ARRAYAGG(JSON_OBJECT('username', at.username, 'name', b.name, 'profilePic', b.profilePic)) AS attendents FROM room a LEFT JOIN roomAttendant at ON a.ID = at.roomID LEFT JOIN user b ON at.username = b.username WHERE a.typeID = ? GROUP BY a.ID";

  db.query(sql, [typeID], (err, results) => {
    if (err) {
      console.log(err);
      console.log("ERROR");
      res.status(500).json({ error: 'Database error' });
    } else {
      // Extract only the result rows
      const rooms = results.map(result => ({
        ID: result.ID,
        attendents: result.attendents
      }));
      res.status(200).json({ rooms });
    }
  });
});

app.get('/getRoomDetails', (req, res) => {
  // Retrieve username and password from the request body
  const { roomID } = req.query;
  const sql = "SELECT a.ID, JSON_ARRAYAGG(JSON_OBJECT('username', at.username, 'name', b.name, 'profilePic', b.profilePic)) AS attendents FROM room a LEFT JOIN roomAttendant at ON a.ID = at.roomID LEFT JOIN user b ON at.username = b.username WHERE a.ID = ? GROUP BY a.ID";

  db.query(sql, [roomID], (err, results) => {
    if (err) {
      console.log(err);
      console.log("ERROR");
      res.status(500).json({ error: 'Database error' });
    } else {
      // Extract only the result rows
      const rooms = results.map(result => ({
        ID: result.ID,
        attendents: result.attendents
      }));
      res.status(200).json({ rooms });
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

