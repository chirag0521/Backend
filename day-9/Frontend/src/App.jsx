import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test 1",
      description: "description 1"
    },
    {
      title: "test 2",
      description: "description 2"
    },
    {
      title: "test 3",
      description: "description 3"
    },
    {
      title: "test 4",
      description: "description 4"
    },
  ])


  // *** ONE METHOD OF USING AXIOS

  // async function getData(){
  //   const response = await axios.get("http://localhost:3000/api/notes")
  //   setNotes(response.data.notes);

  // }
  // getData()

  // *** ANOTHER METHOD OF USING AXIOS

  // axios.get("http://localhost:3000/api/notes")
  //   .then((res) => {
  //     setNotes(res.data.notes);
  //   })

  function fetchNotes() {
    axios.get("https://backend-pkni.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.notes)
      })
  }
  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    console.log(title.value, description.value);

    //To put this data in database or yeh data req.body mein ayega
    axios.post("https://backend-pkni.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes()

      })
  }

  function handleDeleteNote(noteId) {
    axios.delete("https://backend-pkni.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes()
      })

  }

  function handleUpdateDescription(noteId){
    console.log(noteId);
    const newDescription = prompt("Enter new description")
    if(!newDescription) return
  
    axios.patch("https://backend-pkni.onrender.com/api/notes/"+noteId,{
      description : newDescription
    })
    .then((res)=>{
      console.log(res.data);
      
      fetchNotes()
    })

  }

 
  return (
    <>
      <form className='note-create-form' onSubmit={(e) => {      // or directly onSubmit={handleSubmit}
        handleSubmit(e)
      }}>
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
              <button onClick={() => { handleDeleteNote(elem._id) }}>Delete</button>
              <button onClick={()=>{handleUpdateDescription(elem._id)}}>Update description</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App