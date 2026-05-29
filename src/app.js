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

 //update notes

 app.patch('/api/notes/:id', async(req,res)=>{
        let {id}=  req.params
        let {description}=  req.body

        let updatenotes  =  await  NotesModel.findByIdAndUpdate(id)
        updatenotes.description =  description
        await updatenotes.save()

        if (!updatenotes) {
            return res.status(404).json({
                message:"note not found"
            })
        }


        return res.status(200).json({
            message:"description update",
            updatenotes
        })

 })

 //delete 

 app.delete('/api/notes/:id',async(req,res)=>{
     let {id}=  req.params

     let notsedelete  = await NotesModel.findByIdAndDelete(id)

     return res.status(200).json({
        message:"notes delete",
        notsedelete
     })


 })

 export default app