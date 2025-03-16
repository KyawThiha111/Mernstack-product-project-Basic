import { Schema, model } from "mongoose";

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
    }
}, {timestamps:true})

const Product = model("Product",ProductSchema)
export default Product