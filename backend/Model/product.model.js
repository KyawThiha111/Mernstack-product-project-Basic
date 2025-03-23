import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const ProductSchema = new Schema({
    productname:{
        type: String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    note:[
       { type:String,
        required:true}
    ],
    projectOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admins",
        required:true
    }
}, {timestamps:true})

const Product = model("Product",ProductSchema)
export default Product