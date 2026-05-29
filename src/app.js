import express  from 'express'

 const app  = express()
 app.use(express.json())


 //craete notes post method

 app.post('/api/notes',(req,res)=>{
        let {title, description} =  req.body

        console.log(req.body);
        
 })

 export default app