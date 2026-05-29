const { default: mongoose } = require("mongoose");

const NotesSchema  =  mongoose.Schema({
    title:{
        type:String,
        trim:true
    },

     description:{
        type:String,
        trim:true
    },
}) 

let NotesModel  =  mongoose.model('notes', NotesSchema)

export default NotesModel