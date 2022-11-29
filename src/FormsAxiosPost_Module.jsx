//import axios from "axios";
const { useEffect, useState } = require ("react");
const { NotePost } = require ("./components_notesPost/NotePost");
const noteService = require( "./modules_notesPost/noteService");

export const FormsAxiosPostModule = () => {
    
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
       noteService.getAll()
       .then(initialNotes => setNotes(initialNotes))
       }, [newNote])
    
    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
  
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
          content: newNote,
          date: new Date().toISOString(),
          important: Math.random() < 0.5,
        }
        noteService.create(noteObject)
            .then(typedNote => {notes.concat(typedNote); setNewNote("")})      
    }

    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }else{
        return (
          <div className="error">
            {message}
          </div>
        )
      }   
     
    }
    
    const notesToShow = showAll? notes: notes.filter(note => note.important === true)
    console.log("SHOW ALL", showAll)
    console.log("NOTES", notes)
    console.log("FILTERED NOTES", notes.filter(note => note.important === true))
    console.log("NOTES_TO_SHOW", notesToShow)


    const toggleImportanceOf = (id) => {
      
        const note = notes.find(n => n.id === id)
        console.log("NOTE", note)
        const changedNote = { ...note, important: !note.important }
        console.log("CHANGED NOTE", changedNote)

        noteService.update(id, changedNote)
            .then(response => {
            setNotes(notes.map(note => note.id !== id ? note : response))
            console.log("BUTTON CLICKED: NOTES==>", notes)
        })
            .catch(error => {               
              setErrorMessage(`the note '${note.content}' was already deleted from server`)  
              console.log("ERROR MESSAGE", errorMessage)           
              setTimeout(()=>setErrorMessage(null),5000)
              setNotes(notes.filter(n => n.id !== id))
            })
    }
    
  return (
    <div>
        <h1>Notes AXIOS post</h1>
        <Notification message={errorMessage}></Notification>
             
        <form onSubmit={addNote}>
            <input
                placeholder="Add a new note..." 
                value={newNote}
                onChange={handleNoteChange} />
            <button type="submit">save</button>
        </form>
        <div>
            <button onClick={() => setShowAll(!showAll)}> show {showAll ? 'important' : 'all' }</button>
        </div>
        <ul>
          {notesToShow.map((note,i) => 
            <NotePost 
              key={i} 
              note={note} 
              toggleImportance={()=> toggleImportanceOf(note.id)}>
            </NotePost>)}
        </ul>   
    </div>
  )
}