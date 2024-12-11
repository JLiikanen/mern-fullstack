import express from "express";
import goalsRouter from "./routes/goals.js";
import userRouter from "./routes/users.js"
import errorHandlerForApiGoals from "./middleware/errormiddleware.js"
import ConnectDB from "./config/db.js"    
import cors from 'cors'

const port = 3000;

const app = express();


ConnectDB();  

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));


app.use("/api/goals", goalsRouter);

app.use("/api/users", userRouter)

app.use(errorHandlerForApiGoals)

app.listen(port, () => {
    console.log(`Server is running on port ${port}. http://localhost:${port}/api/goals`);
});


console.log("Hello, world!");
