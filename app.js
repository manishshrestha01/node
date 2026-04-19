require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const app = express()
app.use(express.json())

connectToDatabase()

app.get("/",(req,res)=>{
    res.json({
        message:"This is homepage"
    })
}
)

app.post("/blog",(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        message : "Blog API hit success"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Node JS Project started.....")
})
