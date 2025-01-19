import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectToDatabase, client } from './config/db.js';  // Named import
// connectToDatabase(); //check connection using mongoDB

// Connect to MongoDB Atlas
const dbURI = process.env.MONGO_URI;
// Check the connection
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('MongoDB Atlas connection error:', err));
//Above database connection is using Mongoose

//importing models
import Player from "./models/players/players.model.js";
import Team from "./models/teams/teams.model.js";

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON body

const PORT = process.env.PORT || 4000; // PORT from env file

//routing path
app.get('/', (req, res) => {
  res.send(`Hello Nikhil!`);
});


// Create a new blog post and insert into database
// const article = await Blog.create({
//   title: 'Awesome Post!',
//   slug: 'awesome-post',
//   published: true,
//   content: 'This is the best post ever',
//   tags: ['featured', 'announcement'],
// });
// console.log(article);

// POST route to create a player
app.post('/json/add-player', async (req, res) => {
  const { playerFName, playerLName, playerJerseyName, playerJerseyNumber, playerActive } = req.body;

  // Validate required fields
  if (!playerFName || !playerLName || !playerJerseyName || playerJerseyNumber === undefined) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Create a new player
    const newPlayer = new Player({
      playerFName,
      playerLName,
      playerJerseyName,
      playerJerseyNumber,
      playerActive: playerActive !== undefined ? playerActive : true, // Default to true
    });

    // Save the player in the database
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ success: false, error: 'Failed to create player' });
  }
});

app.post('/json/add-team', async (req, res) => {
  const { teamName, teamCaptain = null, teamPlayers = [] } = req.body;

  if (!teamName) {
    return res.status(400).json({ success: false, error: 'Team name is required' });
  }

  try {
    const newTeam = new Team({
      teamName,
      teamCaptain,
      teamPlayers
    })

    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch(error) {
    console.log("Error creating Team: ", error);
    res.status(500).json({success: false, error: "failed to create team"})
  }
})

app.get('/json/teams', async (req, res) => {
  try {
    const players = await Team.find();
    res.status(200).json(players)
  } catch (error) {
    console.log("Error fetching the data: ",error);
    res.status(500).status({success: false, error: "Falie to fetch the teams"})
  }
})

app.get('/json/player-list', async(req, res) => { //get all list of players
  try { 
    await client.connect(); 
    const db = client.db('players_management'); 
    const playersCollection = db.collection('players'); 
    const players = await playersCollection.find().toArray(); 
    res.json(players); 
  }  catch (err) { res.status(500).send(err); 
  } finally { await client.close(); }
});

app.post('/json/create-data',async function (req, res) {
  // Sending request to create a data
  try {
    await client.connect(); 
    const db = client.db('players_management'); 
    db.collection('data').insertOne({ text: req.body.text }, function (
      err,
      info
    ) {
      res.json(info.ops[0])
      // console.log("res",res)
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }

})

// Start the server
app.listen(PORT, () => {
  console.log('Server started on port 3001');
});