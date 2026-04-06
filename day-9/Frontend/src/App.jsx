import React, { useState } from 'react'
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

  axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes  (res.data.notes);
    
  })
  return (
    <>
      <div className="notes">
        {
          notes.map((elem) => {
            return <div className="note">
              <h1>{elem.title}</h1>
              <p>{elem.description}</p>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App