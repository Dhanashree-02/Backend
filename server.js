const express = require ('express')
const connectDB = require ('./src/config/db.js')
const CourseRoute = require ('./src/routers/courseRouter.js')
const StudentRoute = require ('./src/routers/studentRouter.js')
const InstructorRouter = require ('./src/routers/instructorRouter.js')
require ('dotenv').config()

const app = express ()

connectDB()
app.use (express.json())


app.use ('/api/courses' , CourseRoute)
app.use ('/api/students' , StudentRoute)
app.use ('/api/instructor' , InstructorRouter)


const PORT = process.env.PORT || 3000
app.listen (PORT ,() => 
{
    console.log(`server is running on port : ${PORT}`)
})  