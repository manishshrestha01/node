require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const app = express()

connectToDatabase()

app.get("/",(req,res)=>{
    res.json({
        message:"This is homepage"
    })
}
)

app.get("/about",(req,res)=>{
    res.json({
        message:"This is about page"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Node JS Project started.....")
})
