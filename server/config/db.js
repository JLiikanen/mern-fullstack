import mongoose from "mongoose";
import dotenv from 'dotenv'
// open connection here for any func calls
dotenv.config()

const MONGODB_URI = `mongodb+srv://jakkejavi:${process.env.MONGODB_PASSWORD}@freedevjavisandbox.29csi.mongodb.net/?retryWrites=true&w=majority&appName=freedevjavisandbox`


export default async function ConnectDB() {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        console.log("MongoDB Connection opened!")
    } catch (err) {
        console.log(err)
    }
}
