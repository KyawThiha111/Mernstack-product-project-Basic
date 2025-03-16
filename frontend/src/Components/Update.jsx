import { useEffect, useState } from "react";
import { useEachProductStore } from "../zustand_Store/products";
import { useProductStore } from "../zustand_Store/products";
import { useNavigate } from "react-router";
const UpdateBox = ({ setClickEdit,id }) => {
  const { matchProduct } = useEachProductStore();
  const [updatedProduct, setUpdatedProduct] = useState({
    productname: matchProduct?.productname,
    price: matchProduct?.price,
    photo: matchProduct?.photo,
  });
  const {updateProduct} = useProductStore();
  const navigate = useNavigate()
  const editSubmit = async(id)=>{
       const {success,message} = await updateProduct(id,updatedProduct)
        console.log("SM",success,message)
        alert("Post edited!")
        setClickEdit(false)
  }
  return (
    <div>
      <form onSubmit={()=>editSubmit(matchProduct?._id||id)} className="mt-3">
        {/* Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="productname"
          >
            Username
          </label>
          <input
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                productname: e.target.value,
              })
            }
            type="text"
            id="productname"
            name="productname"
            value={updatedProduct.productname}
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
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
            value={updatedProduct.price}
            type="text"
            id="price"
            name="price"
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
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, photo: e.target.value })
            }
            type="text"
            id="photo"
            name="photo"
            value={updatedProduct.photo}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
            required
          />
        </div>
        {/* Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-400 w-[30%] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            onClick={() => setClickEdit(false)}
            className="bg-red-400 w-[30%] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBox;