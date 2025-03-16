import { useEffect } from "react";
import {Link} from "react-router"
import { useProductStore } from "../zustand_Store/products"
const DisplayPost = ()=>{
    const {fetchProducts,products} = useProductStore();
        useEffect(()=>{
          fetchProducts()
          console.log(products)
        },[])

  return(
    <div className="container-fluid lg:container mx-auto">
        <div>
            <h2 className="text-gray-600 text-3xl text-center my-3">Patient Lists</h2>
            <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-5">
               {products.map((product,index)=>{
                return(
                    
                    <div key={index} className="w-[80%] mx-auto flex justify-center items-center border border-gray-400 border-1">
                       <Link to={`/seeproducts/${product._id}`}>
                       <div className="flex flex-col justify-center items-center">
                        <h2>{product.productname}</h2>
                        <h2>{product.price}</h2>
                        <img className="w-[70%] mb-3" src={`${product.photo}`}/>
                        </div>
                       </Link>
                    </div>
                
                )
               })}
            </div>
        </div>
    </div>
  )
}

export default DisplayPost;