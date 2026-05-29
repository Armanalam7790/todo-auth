import express from 'express'
import NotesModel from './models/notes.models.js'
import UserModel from './models/users.model.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())
app.use(cookieParser())

//auth register

app.post('/api/auth/register', async (req, res) => {
    const { name, email } = req.body
    if (!name) {
        return res.status(404).json({
            message: "name is required"
        })
    }

    if (!email) {
        return res.status(404).json({
            message: "email is required"
        })
    }


    let newuser = await UserModel.create({ name, email })

    const token = jwt.sign({ id: newuser._id, email: newuser.email },process.env.JWT_SECERET)

    res.cookie('token', token)

    return res.status(201).json({
        message: "registerd done",
        user: newuser
    })


})

app.get('/api/auth/me', (req, res) => {
    const token = req.cookies.token
  
    console.log('token from cookie', token);

})


//craete notes post method

app.post('/api/notes', async (req, res) => {
    let { title, description } = req.body
    const token  = req.cookies.token
    const user  =  jwt.verify(token, process.env.JWT_SECERET)

    req.user  =  user

    //validation
    if (!title) {
        return res.status(400).json({
            message: "title is required"
        })
    }
    if (!description) {
        return res.status(400).json({
            message: "title is required"
        })
    }

    //add in db
    let newnotes = await NotesModel.create({ title, description, user:req.user.email })

    return res.status(201).json({
        message: "notes created",
        newnotes
    })

})


// fetch all notes from db

app.get('/api/notes', async (req, res) => {

    let token  =  req.cookies.token
    let user =  JSON.parse(token)

    req.user = user
    let notes = await NotesModel.find({
        user:req.user.email
    })

    res.status(200).json({
        message: "notes fetched ",
        notes
    })
})

//update notes

app.patch('/api/notes/:id', async (req, res) => {
    let { id } = req.params
    let { description } = req.body

    let updatenotes = await NotesModel.findByIdAndUpdate(id)
    updatenotes.description = description
    await updatenotes.save()

    if (!updatenotes) {
        return res.status(404).json({
            message: "note not found"
        })
    }


    return res.status(200).json({
        message: "description update",
        updatenotes
    })

})

//delete 

app.delete('/api/notes/:id', async (req, res) => {
    let { id } = req.params

    let notsedelete = await NotesModel.findByIdAndDelete(id)

    return res.status(200).json({
        message: "notes delete",
        notsedelete
    })


})

export default app