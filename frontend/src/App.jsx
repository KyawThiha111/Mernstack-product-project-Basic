import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router"
import HomePage from './Pages/Home';
import DisplayPost from './Pages/Posts';
import SeeEachPost from "./Pages/EachPost"
import AddProductPage from './Pages/AddProduct';
import NavBar from './Pages/Navbar';
function App() {
  const [count, setCount] = useState(0)
  
  return (
   <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/seeproducts' element={<DisplayPost/>}/>
      <Route path="/addproduct" element={<AddProductPage/>}/>
      <Route path="/seeproducts/:id" element={<SeeEachPost/>}/>
    </Routes>
   </Router>
  )
}

export default App
