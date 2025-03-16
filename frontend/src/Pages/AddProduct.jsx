import { useState } from "react";
import {useProductStore} from "../zustand_Store/products";
import { useNavigate } from "react-router";
const AddProductPage = () => {
    const [inputproductname,setInputProductname] = useState("")
    const [inputprice,setInputPrice] = useState("")
    const [inputphoto,setInputPhoto] = useState("")
   const navigate = useNavigate()
  const {createProduct,products} = useProductStore();
    const AddProductBTN = async(e)=>{
        e.preventDefault()
       const {success,message} = await createProduct({
        productname:inputproductname,
        price:inputprice,
        photo:inputphoto
       })
       console.log(success,message)
       navigate("/seeproducts")
    }
  return (
    <div className="container-fluid lg:container mx-auto mt-5">
      <div>
        <h1 className="text-center text-xl">Add a new patient</h1>
        <form className="mt-3" onSubmit={AddProductBTN}>
          {/* Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="productname"
            >
              Username
            </label>
            <input
             onChange={(e)=>setInputProductname(e.target.value)}
              type="text"
              id="productname"
              name="productname"
              value={inputproductname}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>
          {/* Price */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              onChange={(e)=>setInputPrice(Number(e.target.value))}
              type="text"
              id="price"
              name="price"
              value={inputprice}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>
          {/* Photo */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
             onChange={(e)=>setInputPhoto(e.target.value)}
              type="text"
              id="photo"
              name="photo"
              value={inputphoto}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>
          {/* Button */}
          <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
