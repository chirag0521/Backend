import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([
    {
      title: "title 1",
      description: "description 1"
    },
    {
      title: "title 2",
      description: "description 2"
    },
    {
      title: "title 3",
      description: "description 3"
    },
    {
      title: "title 4",
      description: "description 4"
    },
  ])

  function fetchData(){
    axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes(res.data.notes);
    
  })
  }
  useEffect(()=>{
    fetchData() 
  },[])

 
  function submitHandler(e){
    e.preventDefault()
    const {title,description} = e.target.elements
    console.log(title.value,description.value);

    // Creates a new data
    //object form mein bhej do woh seedha req.body mein jayega
    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data);
      // yeh call kiya because woh firse axios.get ko call karega
      fetchData()
      
    })
  }

function deleteHandler(noteId){
  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then((res)=>{
    console.log(res.data);
    fetchData()
  })
}

function updateHandler(noteId){
  const newDescription = prompt("Enter new description")
  if(!newDescription) return
  axios.patch("http://localhost:3000/api/notes/"+noteId,{
    description:newDescription
  })
  .then((res)=>{
    console.log(res.data);
    fetchData()
  })
  console.log(noteId);
  

}



  return (
    <>

    <form className='note-create-form' onSubmit={submitHandler}>
    <input name='title' type="text" placeholder='Enter title' />
    <input name='description' type="text" placeholder='Enter description' />
    <button>Create note</button>
    </form>

      <div className="notes">
        {
          notes.map((elem) => {
           return <div className="note">
              <h1>{elem.title}</h1>
              <p>{elem.description}</p>
              <div className="buttons">
                <button onClick={()=>{
                  deleteHandler(elem._id)
                }}>delete</button>
                <button onClick={()=>{
                  updateHandler(elem._id)
                }}>Update Description</button>
              </div>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App