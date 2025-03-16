import { useProductStore } from "../zustand_Store/products";
import { useEffect } from "react";
const HomePage = ()=>{
   return(
    <div className="container-fluid lg:container mx-auto">
        <h1 className="text-3xl text-center mt-3 text-gray-500">Welcome home!</h1>
    </div>
   )
}

export default HomePage;