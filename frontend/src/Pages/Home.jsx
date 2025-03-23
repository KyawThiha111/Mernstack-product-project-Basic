import { useProductStore } from "../zustand_Store/products";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";
const HomePage = ()=>{
    const [cookies,setCookie] = useCookies(["adminToken"]);
   return(
    <div className="container-fluid lg:container mx-auto">
        <h1 className="text-3xl text-center mt-3 text-gray-500">Welcome home!</h1>

        <div className="w-auto h-[100vh]  flex justify-center items-start mt-10">
            {cookies.adminToken?(
                <div className="text-3xl text-center">Hello Doctor!</div>
            ):(
                <div className="flex flex-col gap-5 w-[80%] mx-auto">
                    <div>
                    <Link to="/loginadmin">
                    <button className="text-2xl inline-block p-3 file:border border-2 bg-red-300 border-red-300">Login as a doctor 
                        <span>👨‍⚕️</span>
                    </button>
                    </Link>
                    </div>
                    {/* Receptionist */}
                    <Link to="/loginadmin">
                    <button className="text-2xl inline-block p-3 border border-2 bg-red-300 border-red-300">Login as a receptionist 
                        <span>💁‍♀️</span>
                    </button>
                    </Link>
                </div>
            )}
        </div>
    </div>
   )
}

export default HomePage;