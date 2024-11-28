import { MongoClient } from 'mongodb';
import express from 'express';
import ChatUI from './chatui.js';


async function queryMovie() {
    const uri = "mongodb+srv://jakkejavi:y7roLWEMEot1PJPi@freedevjavisandbox.29csi.mongodb.net/";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");
        
        const movie = await movies.findOne({year : {$gt : 1980}},{projection : {title : 1, rated : 1, year : 1}});
        console.log(movie);
        
    } catch (err) {
        console.error("Error querying MongoDB:", err);
    } finally {
        await client.close();
    }
}

// Express part

const app = express();

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
  }
  
  app.use(myLogger)

app.get('/', (req, res) => {
    if (req.query.sup == "Secret") {
        res.send("Welcome to the secret page");
    } else {
        res.sendFile('C:\\Users\\jacqu\\Tiedostoja\\Koodaus-harjoitukset\\mern-fullstack\\index.html');
    }
  });
  
app.get('/chat', (req, res) => {	
    res.send(ChatUI);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000. Go to http://localhost:3000/');
});
