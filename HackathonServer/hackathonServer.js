



const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const { StreamChat } = require('stream-chat')


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
const port = 8000; // or any port of your choice

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hockey@2003",
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
  const sql = "SELECT a.ID, JSON_ARRAYAGG(JSON_OBJECT('username', at.username, 'name', b.name, 'profilePic', b.profilePic, 'major', b.major)) AS attendents FROM room a LEFT JOIN roomAttendent at ON a.ID = at.roomID LEFT JOIN user b ON at.username = b.username WHERE a.typeID = ? GROUP BY a.ID";

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


 




app.get('/login', (req, res) => {
    // Retrieve username and password from the request body
    const { username, password } = req.query;
  console.log("Test")
  console.log(username+"END")
  console.log(password+ "End")
    if (username && password) {
        const sql = "SELECT * FROM user WHERE Username = ? AND password = ?";
        db.query(sql, [username, password], (err, results) => {
            if (err) {
              console.log(err)
              console.log("ERROR")
                res.status(500).json({ error: 'Database error' });
            } else {
                if (results.length === 1) {
                    // Valid login
                    res.status(200).json({ results });
                } else {
                  console.log(results)
                    // Invalid login
                    res.status(401).json({ error: 'Invalid credentials' });
                }
            }
        });
      // Implement your authentication logic here
      // For simplicity, we'll just echo the received data
      
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  });


  app.post('/confirm', (req, res) => {
    const { token } = req.body;
  
    if (token) {
      const sql = "SELECT * FROM createAttempts WHERE token = ?";
      db.query(sql, [token], (err, results) => {
        if (err) {
          res.status(500).json({ error: 'Database error' });
        } else {
          if (results.length > 0) {
            // Token found in the database, confirming the account
            // Here, you might update the user's status to 'confirmed' or perform other actions
            res.status(200).json({ message: 'Account confirmed successfully' });
          } else {
            // Token not found in the database or expired
            res.status(400).json({ error: 'Invalid or expired token' });
          }
        }
      });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  });
  
  
  
 app.get('/confirm', (req, res) => {
    const { token } = req.query;
  
    if (token) {
      const selectSql = "SELECT * FROM createAttempts WHERE token = ?";
      db.query(selectSql, [token], (err, results) => {
        if (err) {
          res.status(500).json({ error: 'Database error' });
        } else {
          if (results.length > 0) {
            // Token found in the createAttempts table
            const user = results[0]; // Assuming there's only one user per token
            
            const { username, password, email } = user;
            // Insert the user information into the users table
            const insertSql = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
            db.query(insertSql, [username, password, email], (err, insertResult) => {
              if (err) {
                res.status(500).json({ error: 'Failed to create user' });
              } else {
                // User successfully inserted into the users table
                // You might want to remove the entry from createAttempts table here if needed
                res.status(200).json('You have successfully confirmed your xSpot Account!');
              }
            });
          } else {
            // Token not found in the createAttempts table or expired
            res.status(400).json({ error: 'Invalid or expired token' });
          }
        }
      });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

  app.get('/friendsList', (req,res)=>{
    const {username}=req.query;
    console.log(username);
    console.log("Friends");
    const query="SELECT a.username2, b.profilePic, b.bio, b.name FROM friends a inner join user b on a.username2=b.username where username1 = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Database error' });
      } else {
              res.status(200).json({ results });
          
      }
  });

  });

  
  app.get('/mutualFriends', (req,res)=>{
    const {username, friendUsername}=req.query;
    console.log("USERNAME");
    console.log(username);
    console.log("FRIEND USERNAME");
    console.log(friendUsername);
    const query="SELECT a.username2, b.profilePic, b.bio, b.name from friends a inner join user b on a.username2=b.username where a.username1=? and a.username2 in (select username2 from friends where username1=?)";
    db.query(query, [username, friendUsername], (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Database error' });
      } else {
        console.log(results);
              res.status(200).json({ results });
          
      }
  });

  });

  app.get('/accountUpdate', (req,res)=>{
    const {username, profilePic, name, bio}=req.query;
    console.log(profilePic);
    const query="Update user set profilePic =?, name=?, bio=? where username=?";
    db.query(query, [profilePic,name,bio,username], (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Database error' });
      } else {
              res.status(200).json({ data: profilePic });
          
      }
  });

  });

  app.get('/usersList', (req,res)=>{
    
    const query="SELECT username FROM user";
    
    db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Database error' });
      } else {
              res.status(200).json({ results });
          
      }
  });

  });


  app.get('/signUp2', (req, res) => {
    // Retrieve username and password from the request body
    const { username, password, email } = req.query;


  
    if (username && password && email) {
      // Generate a confirmation token
      const token = generateToken();
  
      const sql = "INSERT INTO user ( username, password, email) VALUES (?,?,?)";
        db.query(sql, [ username, password, email], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                print(err.message);
            } 
        });
  
      // Send confirmation email containing the link with the token
      // Code to send email with a link containing the token goes here...
  
      // Respond to the user with instructions to confirm their email
      res.status(200).json({ data: 'SignUpRequest' });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

  app.get('/addFriendsList', (req,res)=>{
    
    const {user, friend}=req.query;
    console.log(user, friend);
    const token = generateToken();
    const query="INSERT INTO friendrequests(request_id, fromUser, toUser,confirmed) VALUES (?,?,?,1)";

    
    db.query(query, [token, user, friend], (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Database error' });
      } else {
              res.status(200).json({ data: token });
          
      }
  });

  });

  app.get('/accountView', (req, res) => {
    const { username } = req.query;
    console.log(username);
    const query = "SELECT username, profilePic, name, bio from user where username=?";
    db.query(query, [username], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' }); // Send JSON response with status 500
        } else {
            res.status(200).json({ results }); // Send JSON response with status 200
        }
    });
});

  app.get('/fetchFriendRequests', (req,res)=>{
    
    const {username}=req.query;
    console.log(username);
    console.log("reached");
    const query="SELECT * from friendrequests where toUser= ? and confirmed= 1";
    
    db.query(query, [username],(err, results) => {
      if (err) {
          res.status(500).json({ error: 'Database error' });
      } else {
              res.status(200).json({ results });
          
      }
  });

  });

  
  app.get('/removeRequest', (req,res)=>{
    
    const {username, friend}=req.query;
    console.log("INSIDE REMOVE")
    console.log(username, friend);
    

     

    
    const query="UPDATE friendRequests set confirmed =0 where toUser= ? and fromUser= ?";
    
    db.query(query, [username, friend],(err, results) => {
      if (err) {
        console.log(err);
          res.status(500).json({ error: 'Database error' });
      } else {
              res.status(200).json({ results });
          
      }
  });

  });

  app.get('/addFriend', (req,res)=>{
    
    const {username, friend}=req.query;
    console.log("INSIDE")
    console.log(username, friend);
     friendID = generateToken();

     friendID = friendID.substring(0, 10);

    
    const query="INSERT INTO friends (friendship_id, username1, username2, Date_created) VALUES(?,?,?,'2023-11-29')";
    
    db.query(query, [friendID, username, friend],(err, results) => {
      if (err) {
        console.log(err);
          res.status(500).json({ error: 'Database error' });
      } else {
              res.status(200).json({ results });
          
      }
  });

  });

  app.get('/newEvent', (req, res) => {
    // Retrieve event info from the request body
    const { eventID, title, coordinates,description, startTime, endTime,orgainizerID } = req.query;


  
    if (eventID && title && coordinates && description && startTime && endTime && orgainizerID) {
      // Generate a confirmation token
      const token = generateToken();
  
      const sql = "INSERT INTO event ( eventID, title, coordinates,description, startTime, endTime,orgainizerID) VALUES (?,?,?,?,?,?)";
        db.query(sql, [ eventID, title, coordinates,description, startTime, endTime,orgainizerID], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                print(err.message);
            } 
        });
  
      // Send confirmation email containing the link with the token
      // Code to send email with a link containing the token goes here...
  
      // Respond to the user with instructions to confirm their email
      res.status(200).json({ data: 'CreateEventRequest' });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  });

  app.get('/pastActivity', (req, res) => {
    // Retrieve event info from the request body
    


  
   

  
      const sql = "SELECT a.title, a.description, a.mainPhoto, GROUP_CONCAT(p.photo) AS photos, JSON_ARRAYAGG(JSON_OBJECT('username', at.username,'name', f.Name,'profilePic', f.profilePic,'bio', f.bio)) AS attendents FROM event a LEFT JOIN eventPhotos p ON a.event_ID = p.event_ID LEFT JOIN eventAttendents at ON a.event_ID = at.event_ID LEFT JOIN user f ON at.username=f.username GROUP BY a.event_ID; ";
        db.query(sql, [], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                print(err.message);
            } 

            console.log(results);

            const processedResults = results.map(result => ({
              title: result.title,
              description: result.description,
              mainPhoto: result.mainPhoto,
              photos: result.photos ? result.photos.split(',') : [], // Assuming photos are comma-separated
              attendents: result.attendents // Split only if result.attendents is not null
          }));
  
            console.log(processedResults);
      res.status(200).json(processedResults);
        });
  
      // Send confirmation email containing the link with the token
      // Code to send email with a link containing the token goes here...
  
      // Respond to the user with instructions to confirm their email
      
   
  });

  app.get('/getEvents', (req, res) => {
    // Retrieve event info from the request body
    


  
   
      // Generate a confirmation token
      const token = generateToken();
  
      const sql = "SELECT title, longitude, latitude FROM event;";
        db.query(sql, [], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                print(err.message);
            } 

         else{ 
      res.status(200).json(results);
         }
        });

      
   
  });






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

