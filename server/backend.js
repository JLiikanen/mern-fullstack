import express from "express";
import goalsRouter from "./routes/goals.js";
import userRouter from "./routes/users.js"
import errorHandlerForApiGoals from "./middleware/errormiddleware.js"
import ConnectDB from "./config/db.js";     
const port = 3000;

const app = express();


ConnectDB();  

app.use(express.json());

app.use("/api/goals", goalsRouter);

app.use("/api/users", userRouter)

app.use(errorHandlerForApiGoals)

app.listen(port, () => {
    console.log(`Server is running on port ${port}. http://localhost:${port}/api/goals`);
});


console.log("Hello, world!");
