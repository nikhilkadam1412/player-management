import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();
const dbURI = process.env.MONGO_URI;
// Check the connection

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch(err => console.log('MongoDB Atlas connection error:', err));
// Above database connection is using Mongoose


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(dbURI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        serverSelectionTimeoutMS: 30000,
    });
  
    async function connectToDatabase() {
        try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the application if the connection fails
        } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        }
    }

//   connectToDatabase();
  // above code is for database connnection provided by Atlas mongoClient
  
  // async function connectToDatabase() {
  //   const uri = process.env.MONGO_URI;  // MongoDB connection string from your .env file
  //   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  //   try {
  //     // Establish connection to MongoDB
  //     await client.connect();
  //     console.log("Connected to MongoDB Atlas");
  
  //     // Ping the server to check the connection
  //     const result = await client.db("admin").command({ ping: 1 });
      
  //     // If the server responds with { ok: 1 }, connection is successful
  //     console.log("Ping response:", result);  // { ok: 1 }
  
  //   } catch (error) {
  //     console.error("Error connecting to MongoDB Atlas:", error);
  //   } finally {
  //     // Close the connection when done
  //     await client.close();
  //   }
  // }
  
  // connectToDatabase();
  //above code for the database connection with simple function
  export { connectToDatabase, client };  // Named export
  