require("dotenv").config()
const express = require("express")
const connectToDatabase = require("./database")
const Blog = require("./model/blogModel")
const { multer, storage } = require("./middleware/multerConfig")
const upload = multer({ storage: storage })

const fs = require("fs")
const { error } = require("console")

const cors = require("cors")
app.use(cors(
  {
  origin:"http://localhost:5173/"
}
))
const app = express()
app.use(express.json())

connectToDatabase()

app.get("/", (req, res) => {
  res.json({
    message: "This is homepage",
  })
})
//RESTFULL API SEQUENCE
//CREATE
app.post("/blog", upload.single("image"), async (req, res) => {
  const { title, subtitle, description } = req.body
  const filename = req.file.filename

  if (!title || !subtitle || !description) {
    return res.status(400).json({
      message: "Please fill all the details",
    })
  }

  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  })
  res.status(200).json({
    message: "Blog API hit success",
  })
})
//READ DATA
app.get("/blog", async (req, res) => {
  const blogs = await Blog.find() //array
  res.status(200).json({
    message: "Fetch Success",
    data: blogs,
  })
})
//READ BY ID
app.get("/blog/:id", async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id) //object
  if (!blog) {
    res.status(400).json({
      message: "error",
    })
  } else {
    res.status(200).json({
      message: "Fetch success",
      data: blog,
    })
  }
})

//delete
app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  const imageName = blog.image

  //remove file
  fs.unlink(`storage/${imageName}`, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log("File deleted successfully")
    }
  })
  await Blog.findByIdAndDelete(id)
  res.status(200).json({
    message: "Blog Deleted Successfully",
  })
})
//patch
app.patch("/blog/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id
  const { title, subtitle, description } = req.body
  let imageName

  if(req.file){
    imageName = req.file.filename
  const blog = await Blog.findById(id)
  const oldimageName = blog.image

  //remove file
  fs.unlink(`storage/${oldimageName}`, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log("File updated successfully")
    }
  })
  }
  await Blog.findByIdAndUpdate(id, {
    title: title,
    subtitle: subtitle,
    description: description,
    image: imageName
  })
  res.status(200).json({
    message: "Blog Updated Successfully",
  })
})

app.use(express.static("./storage"))

app.listen(process.env.PORT, () => {
  console.log("Node JS Project started.....")
})
