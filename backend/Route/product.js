import { Router } from "express";
import {displayProduct,displayEachProduct,displayEachproductWithQuery,addPost,DeleteProduct,UpdateProduct,AddnewNote } from "../Controller/product.js";
import {AddPostRouteValidator,FindWithQueryValidator} from "../utils/productValidator.js"

const Route = Router()
Route.get("/displayproducts",displayProduct);
Route.get("/displayeachproduct/:id",displayEachProduct)
Route.get("/displayproductwithquery",FindWithQueryValidator,displayEachproductWithQuery)
Route.post("/addpost",AddPostRouteValidator,addPost)
/* Need to fix this put route */
Route.put("/updateproduct/:id",UpdateProduct)
Route.put("/addnewnote",AddnewNote)

Route.delete("/deleteproduct/:id",DeleteProduct)
export default Route;