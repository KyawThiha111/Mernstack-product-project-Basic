import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const AddNote = (props)=>{
    const [newNote,setNewNote] = useState({
        postid:props.postid,
        newnote:""
    })
    const navigate = useNavigate();
    const AddNoteBtn = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.put("/api/products/addnewnote",newNote,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            console.log(response)
            alert(response.data.message)
        } catch (error) {
            console.log(error)
            return alert(error.message)
        }finally{
            setNewNote({
                postid:props.postid,
                newnote:""
            })
        }
    }
    return(
        <div>
            <form onSubmit={(e)=>AddNoteBtn(e)} className="mt-3">
         {/* Note Text */}
         <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="newnote"
            >
              Add a new clinical note
            </label>
            <textarea
              onChange={(e)=>setNewNote({...newNote,newnote:e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newNote.newnote}
              id="notes"
              name="newNote"
              rows="4"
              cols="50"
              placeholder="Write a new precription note here..."
            ></textarea>
          </div>
        {/* Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-400 w-[30%] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>
        </div>
    )
}

export default AddNote;