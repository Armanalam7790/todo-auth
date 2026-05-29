import express  from 'express'
import NotesModel from './models/notes.schema.js'

 const app  = express()
 app.use(express.json())


 //craete notes post method

 app.post('/api/notes', async(req,res)=>{
        let {title, description} =  req.body
//validation
        if (!title) {
            return res.status(400).json({
                message:"title is required"
            })
        }
          if (!description) {
            return res.status(400).json({
                message:"title is required"
            })
        }

//add in db
let newnotes  =  await NotesModel.create({title , description})

return res.status(201).json({
    message:"notes created",
    newnotes
})
        
 })


 // fetch all notes from db

 app.get('/api/notes', async(req,res)=>{
     let notes  =  await NotesModel.find()

     res.status(200).json({
        message:"notes fetched ",
        notes
     })
 })

 export default app