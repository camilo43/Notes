import express from 'express'
import cors from 'cors'
// import path  from 'path'
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

//****** Alternative fixing *******
// if (process.env.NODE_ENV === 'production'){
//   app.use(express.static('build'));
//   app.get('*', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, 'build', 'index.hmtl'))
//   } )
// }

let notes = [  
  {
      id: 1,content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
  },  
  {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
  },
  {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true  
  }
]

app.get('/notes/', (request, response) => {
  response.json(notes)
  
})

app.put('/notes/:id' , (req, res)=>{   
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  const body = req.body.important
  console.log("BODY", body)
  res.json({...note, important:body})
}) 
 

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
    console.log("NOTE BOOL", Boolean(note))
  } else {
    response.status(404).end()}
})

app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(202).end() 
})
 
const generateId = () => { 
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id)) 
  : 0
return maxId+1
}

app.post('/notes', (request, response) => {
    const body = request.body
    console.log("BODY", body)
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })} else {
        const note = {
          content: body.content,
          important: body.important || false,
          date: new Date(),
          id: generateId()}
        
        notes = notes.concat(note)
        response.json(note)
        console.log("NOTES", notes)
      }
    }
  )

  const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

