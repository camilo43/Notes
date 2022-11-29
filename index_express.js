const express = require('express') 
const cors = require('cors') 
// import path  from 'path'
const app = express()
const Note = require('./src/models/notas')

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

// let notes = [  
//   {
//       id: 1,content: "HTML is easy",
//       date: "2019-05-30T17:30:31.098Z",
//       important: true
//   },  
//   {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2019-05-30T18:39:34.091Z",
//       important: false
//   },
//   {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2019-05-30T19:20:14.298Z",
//       important: true  
//   }
// ]

////*****USING MONGOOSE ********/


app.get('/notes/', (request, response, next) => {
  //   Note.find({}).then(notes => {
  //     response.json(notes)
  //   })
  // })
    Note.find({})
    .then(notes => {
      if(notes){
        return response.json(notes)
      }else{
        return response.status(404).end()
      }    
    })
    .catch(e => next(e))
    })

    
app.get('/notes/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('micos')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/notes/:id', (req, res, next) => {
  res.send('special')
})

// app.get('/notes/:id', (request, response, next) => {  
//   Note.find({_id:request.params.id}).then(notes => {
//     if(notes){
//       response.json(notes)
//     }else{
//       return response.status(404).end()
//     }
// })
//   .catch(e => next(e))
// })

app.put('/notes/:id' , (req, res)=>{   
    const id = req.params.id
    const cuerpo = req.body.important
    Note.find({}, (error, data)=>{
      if(error){
        console.log(error)
      }else{
        console.log("BODY", cuerpo)
        console.log("ID", id)
        data.map(e=> e.id === id?  e.important = cuerpo : e)
        console.log("NEW DATA", data)
      }
    })
    // Note.save().then(savedNote => {
    //   res.json({...savedNote, important:body})
    // })
  })

  app.delete('/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
  }
  app.use(errorHandler)

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)
  
//****** WITHOUT MONGOOSE >>>>>> */
// app.get('/notes/', (request, response) => {
//   response.json(notes)
// })

// app.put('/notes/:id' , (req, res)=>{   
//   const id = Number(req.params.id)
//   const note = notes.find(note => note.id === id)
//   const body = req.body.important
//   console.log("BODY", body)
//   res.json({...note, important:body})
// }) 
 

// app.get('/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const note = notes.find(note => note.id === id)
//   if (note) {
//     response.json(note)
//     console.log("NOTE BOOL", Boolean(note))
//   } else {
//     response.status(404).end()}
// })

// app.delete('/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)
//   response.status(202).end() 
// })
 
// const generateId = () => { 
//   const maxId = notes.length > 0
//   ? Math.max(...notes.map(n => n.id)) 
//   : 0
// return maxId+1
// }


// app.post('/notes', (request, response) => {
//   const body = request.body

//   if (body.content === undefined) {
//     return response.status(400).json({ error: 'content missing' })
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   })
// console.log('note', note)
//   note.save().then(savedNote => {
//     response.json(savedNote)
//   })
// })

// app.post('/notes', (request, response) => {
//     const body = request.body
//     console.log("BODY", body)
//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing' 
//       })} else {
//         const note = {
//           content: body.content,
//           important: body.important || false,
//           date: new Date(),
//           id: generateId()}
        
//         notes = notes.concat(note)
//         response.json(note)
//         console.log("NOTES", notes)
//       }
//     }
//   )

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
    console.log(`SERVER running on port ${PORT}`)
  })

