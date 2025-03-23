import { Link, NavLink } from "react-router"
import { useCookies } from "react-cookie";
const NavBar = ()=>{
   const [cookies,setCookie] = useCookies(["adminToken"])
    return(
        <nav className="container-fluid y-3 lg:container py-3 px-3 bg-red-400 mx-auto">
            <div className="flex justify-between">
            <Link to="/">Home Page</Link>
            {/* Buttons */}
            <div>
       {/* Check Conditions */}
     
      {/* Login/Register */}
      {cookies.adminToken?(
       <div className="flex px-3 gap-3">
        {/* Users Page */}
        <Link to="/seeproducts">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
      </Link>
      {/* Add user page */}
            <Link to="/addproduct">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
            </Link>
            <Link>
              Logout
            </Link>
       </div>
           ):(
            <div>
                <Link to="/loginadmin">
             Login
           </Link>
            </div>
           )}
            </div>
            </div>
        </nav>
    )
}

export default NavBar;