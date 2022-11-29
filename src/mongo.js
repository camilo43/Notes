const mongoose = require('mongoose') ;
const Note = require("./Mongo-user")

console.log("--")
// const url = `mongodb+srv://databaseUni:W99YV99wU7dqJ4y@cluster0.pmas4xl.mongodb.net/test`
// mongoose.connect(url)


// async function run(){
//     const user = new User({name:"Kyle", age:26})
//     await user.save()
//     console.log(user)
// }
//  run()


//********OTHER EXERCISE */


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    //process.exit(1)
  }
  
  const password = process.argv[2]
  console.log("PROCESS ALV", process.argv[2])
  
  const url = `mongodb+srv://databaseUni:W99YV99wU7dqJ4y@cluster0.pmas4xl.mongodb.net/noteApp?retryWrites=true&w=majority`
  
  mongoose
    .connect(url)
    .then((result) => {      
      console.log('connected')
  
      const note = new Note({
        content: process.argv[2],
        date: new Date(),
        important: true,
    })
  
      return note.save()
    })
    .then(() => {
      console.log('note saved!')
      //return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
  
    Note.find({}).then(result=> {
        result.forEach(e=> console.log("E", e));
        mongoose.connection.close()
    })