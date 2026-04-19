const express = require('express')
const app = express()


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

app.listen(3000,()=>{
    console.log("Node JS Project started.....")
})