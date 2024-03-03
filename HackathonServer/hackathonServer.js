



const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const { StreamChat } = require('stream-chat');
const ChatGptController = require('./chatGpt.controller')
const fs=require('fs');
const pdf=require ('pdf-parse');



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
  host: "34.130.167.29",
  user: "root",

  database: "hackathon_schema"


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

  const sql = "SELECT a.ID, JSON_ARRAYAGG(JSON_OBJECT('username', at.username, 'name', b.name, 'profilePic', b.profilePic)) AS attendants FROM Room a LEFT JOIN RoomAttendant at ON a.ID = at.roomID LEFT JOIN User b ON at.username = b.username WHERE a.typeID = ? GROUP BY a.ID";


  db.query(sql, [typeID], (err, results) => {
    if (err) {
      console.log(err);
      console.log("ERROR");
      res.status(500).json({ error: 'Database error' });
    } else {
      // Extract only the result rows
      const rooms = results.map(result => ({
        ID: result.ID,
        attendents: result.attendants
      }));
      res.status(200).json({ rooms });
    }
  });
});
app.get('/getAccount', (req, res) => {
  // Retrieve username request body
  const { username } = req.query;
  const sql = "SELECT * FROM User WHere username=?;";
  console.log('here')
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.log(err);
      console.log("ERROR");
      res.status(500).json({ error: 'Database error' });
    } else {
      const user = results.map(result => ({
        username: result.username,
        name: result.name, 
        profile: result.profilePic
      }));
     
      res.status(200).json({ results });
    }
  });
});

app.get('/leaveRoom', (req, res) => {
  const email = req.query.email;
  const room = req.query.room
  console.log("Reached");

  const attendantID = Math.floor(Math.random() * 1000000);


  const sql = "delete from RoomAttendant where username = ?;";


  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log(err);
      console.log("ERROR");
      res.status(500).json({ error: 'Database error' });
    } else {
      // Extract only the result rows
     
      res.status(200).json( "success" );
    }
  });
  
 

  
});

app.get('/enterRoom', (req, res) => {
  const email = req.query.email;
  const room = req.query.room
  console.log("Reached");

  const attendantID = Math.floor(Math.random() * 1000000);


  const sql = "insert into RoomAttendant (attendantID, username, roomID) VALUES (?, ?, ?);";


  db.query(sql, [attendantID, email, room], (err, results) => {
    if (err) {
      console.log(err);
      console.log("ERROR");
      res.status(500).json({ error: 'Database error' });
    } else {
      // Extract only the result rows
     
      res.status(200).json( "success" );
    }
  });
  
 

  
});


app.get('/extract-pdf', (req, res) => {
  const pdfUrl = req.query.pdfUrl;
  
  if (!pdfUrl) {
      return res.status(400).send('PDF URL is required');
  }

  try {
      const dataBuffer = fs.readFileSync(pdfUrl);

      pdf(dataBuffer).then(function(data){
          console.log(data.text);
          res.send(data.text); // Send the response inside the pdf() callback
      });
  } catch (error) {
      console.error('Error reading PDF file:', error);
      res.status(500).send('Error reading PDF file');
  }
});

app.listen(2000, () => {
  console.log('Server is running on port 2000');
});

app.get('/getRoomDetails', (req, res) => {
  // Retrieve username and password from the request body
  const { roomID } = req.query;

  const sql = "SELECT a.ID, JSON_ARRAYAGG(JSON_OBJECT('username', at.username, 'name', b.name, 'profilePic', b.profilePic)) AS attendents FROM Room a LEFT JOIN RoomAttendant at ON a.ID = at.roomID LEFT JOIN User b ON at.username = b.username WHERE a.ID = ? GROUP BY a.ID";


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





