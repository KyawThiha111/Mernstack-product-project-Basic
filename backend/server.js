import express from "express";
import createDB from "./Config/db.js";
import ProductRoute from "./Route/product.js";
const app = express();
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url"
const env =dotenv.config();
const __dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

/* Products routes */
app.use("/api/products",ProductRoute)

//this means we deploy this application when 
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
  })
}
app.listen(process.env.SERVER_PORT,()=>{
    console.log(__dirname)
    createDB()
    console.log(`The server is running on localhost ${process.env.SERVER_PORT}.`)
})
