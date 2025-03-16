import mongoose from "mongoose";
import dotenv from "dotenv";
const env = dotenv.config()
const createDB = async()=>{
 try {
    const result = await mongoose.connect(process.env.MONGO_URL);
    console.log(`The server is connected to ${result.connection.host}`)
 } catch (error) {
    console.error("An error occured when connected to the DB") 
    process.exit(1)
 }
}

export default createDB;
