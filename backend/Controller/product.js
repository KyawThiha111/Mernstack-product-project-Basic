import Product from "../Model/product.model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
export const displayProduct = async(req,res)=>{
    try {
        const productArray = await Product.find();
        if(!productArray){
            throw new error("An error occured!")
        }
        return res.status(200).json({success:true,product:productArray})
    } catch (error) {
        return res.status(500).json({success:false,error:error})
    }
}

export const displayEachProduct = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid Object Id!"})
    }
    try {
        const foundItem = await Product.findById(id);
    if(!foundItem){{
        return res.status(404).json({success:false,message:"No match item in the database!"})
    }}
    return res.status(200).json({success:true,message:foundItem})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error!"})
    }
}
export const displayEachproductWithQuery = async(req,res)=>{
     const error = validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({success:false,message: error.array()})
     }
     const {query:{filterkey,value}} = req;
     if(!filterkey||!value){
        return res.status(400).json({success:false,message:"No validted params"})
     }
     try {
        const matchProduct = await Product.find({[filterkey]:value});
        if(matchProduct.length===0){
            return res.status(200).json({success:true,message:"No products with the query."})
        }
        return res.status(200).json({success:true,message:matchProduct})
     } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error!"})
     }
}
export const addPost = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false,message: error.array()})
    } 
    const {productname,price,photo,note,projectOwner} = req.body;
    if(!productname||!price||!photo||!note||!projectOwner){
        return res.status(400).json({success:false,message:"Data required!"})
    }
   try {
    const createdData = await Product.create({productname,price:Number(price),photo,note,projectOwner});
    return res.status(201).json({success:true,message:createdData})
} catch (error) {
     console.log(error)
     return res.status(500).json({success:false,message:"Internal server error!"})
   }
}

export const DeleteProduct = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid ID"})
    }
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success:true,message:"Product deleted!"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error while deleting the post."})
    }
}

/* Need to get fixed! */
export const UpdateProduct = async(req,res)=>{
    const {id} = req.params;
    const data= req.body; /* Has to be only for new note  */
    console.log("data",data)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid ID"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,{$push:{note:data.newNote}},{new:true})
        return res.status(200).json({success:true,message:"Succesfully updated the product",updatedProduct:updatedProduct})
    } catch (error) {
       return res.status(500).json({success:false,message:"Internal server error"})
    }
}


export const AddnewNote = async(req,res)=>{
    const {postid,newnote}= req.body; /* Has to be only for new note  */
    if(!mongoose.Types.ObjectId.isValid(postid)){
        return res.status(400).json({success:false,message:"Invalid ID"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(postid,{$push:{note:newnote}},{new:true})
        return res.status(200).json({success:true,message:"Succesfully added a new note!",updatedProduct:updatedProduct})
    } catch (error) {
       return res.status(500).json({success:false,message:"Internal server error"})
    }
}