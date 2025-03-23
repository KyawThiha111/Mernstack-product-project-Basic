import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router"
import HomePage from './Pages/Home';
import DisplayPost from './Pages/Posts';
import SeeEachPost from "./Pages/EachPost"
import AddProductPage from './Pages/AddProduct';
import NavBar from './Pages/Navbar';
import RegisterAdmin from './Pages/RegisterAdmin';
import LoginAdmin from './Pages/loginAdmin';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
  <CookiesProvider>
      <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/seeproducts' element={<DisplayPost/>}/>
      <Route path="/addproduct" element={<AddProductPage/>}/>
      <Route path="/seeproducts/:id" element={<SeeEachPost/>}/>
      <Route path='/registeradmin' element={<RegisterAdmin/>}/>
      <Route path="/loginadmin" element={<LoginAdmin/>}/>
    </Routes>
   </Router>
  </CookiesProvider>
  )
}

export default App
