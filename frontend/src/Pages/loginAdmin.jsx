import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
const LoginAdmin = ()=>{
    const [cookies,setCookie] = useCookies(["adminToken"]);
    const [adminTryingToLogin,setThatAdmin] = useState({
        name:"",
        password:""
    })
  const navigate = useNavigate()
    const LoginAdminBtn = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("/api/admins/loginadmin",adminTryingToLogin);
            const adminToken = response.data.message.token;
            console.log(adminToken)
            setCookie("adminToken",adminToken)
            localStorage.setItem("LoginUserId",response.data.message.adminID )
            alert("Successfull log in!")
            return navigate("/")
        } catch (error) {
            alert("Error while logging in!")
            console.log(error)
            return navigate("/")
        }finally{
            setThatAdmin({
                name:"",
                password:""
            })
        }
    }
    return(
        <div className="container-fluid lg:container mx-auto mt-5">
      <div>
        <h1 className="text-center text-xl">Login To Your Account</h1>
        <form className="mt-3" onSubmit={(e)=>LoginAdminBtn(e)}>
          {/*Admin Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="name"
            >
              Username
            </label>
            <input
              onChange={(e)=>setThatAdmin({...adminTryingToLogin,name:e.target.value})}
              type="text"
              id="name"
              name="name"
              value={adminTryingToLogin.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e)=>setThatAdmin({...adminTryingToLogin,password:e.target.value})}
              type="password"
              id="password"
              name="password"
              value={adminTryingToLogin.password}
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
    )
}

export default LoginAdmin;