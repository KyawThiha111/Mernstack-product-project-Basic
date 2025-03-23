import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
const RegisterAdmin = ()=>{

    const [newAdmin,setnewAdmin] = useState({
        name:"",
        position:"",
        password:"",
        email:""
    })
  const navigate = useNavigate()
    const AddAdminBtn = async(e)=>{
      e.preventDefault();
      try {
        const data = await axios.post("api/admins/registernewadmin",newAdmin)
        alert(data.data.message)
        return navigate("/")
      } catch (error) {
        alert("Error while registering!")
        console.log(error.message)
      }finally{
        setnewAdmin({
            name:"",
            position:"",
            password:"",
            email:""
        })
      }
    }
    return(
        <div className="container-fluid lg:container mx-auto mt-5">
      <div>
        <h1 className="text-center text-xl">Register an admin account</h1>
        <form className="mt-3" onSubmit={(e)=>AddAdminBtn(e)}>
          {/*Admin Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="name"
            >
              Username
            </label>
            <input
              onChange={(e)=>setnewAdmin({...newAdmin,name:e.target.value})}
              type="text"
              id="name"
              name="name"
              value={newAdmin.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>
          {/* Position */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="position"
            >
              Position
            </label>
            <input
               onChange={(e)=>setnewAdmin({...newAdmin,position:e.target.value})}
              type="text"
              id="position"
              name="position"
              value={newAdmin.position}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
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
              onChange={(e)=>setnewAdmin({...newAdmin,password:e.target.value})}
              type="password"
              id="password"
              name="password"
              value={newAdmin.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e)=>setnewAdmin({...newAdmin,email:e.target.value})}
              type="email"
              value={newAdmin.email}
              id="email"
              name="email"
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


export default RegisterAdmin;