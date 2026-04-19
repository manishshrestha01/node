require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
app.use(express.json())

connectToDatabase()

app.get("/",(req,res)=>{
    res.json({
        message:"This is homepage"
    })
}
)

app.post("/blog",async(req,res)=>{
    const {title, subtitle, description, image} = req.body
    await Blog.create({
        title : title,
        subtitle : subtitle,
        description : description,
        image : image
    })
    res.status(200).json({
        message : "Blog API hit success"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Node JS Project started.....")
})
