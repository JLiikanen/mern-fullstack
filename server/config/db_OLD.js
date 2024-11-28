import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = `mongodb+srv://jakkejavi:${process.env.MONGODB_PASSWORD}@freedevjavisandbox.29csi.mongodb.net/?retryWrites=true&w=majority&appName=freedevjavisandbox`

/*
console.log('Environment variables:', {
    password: process.env.MONGODB_PASSWORD,
    envPath: process.cwd() // This will show us where Node is looking for the .env file
  });
console.log(MONGODB_URI)

*/


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGODB_URI, 
);
export default async function ConnectDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}