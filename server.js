const express = require ('express')
const connectDB = require ('./src/config/db.js')
const CourseRoute = require ('./src/routers/courseRouter.js')

require ('dotenv').config()

const app = express ()

connectDB()
app.use (express.json())


app.use ('/api/user' , CourseRoute)

const PORT = process.env.PORT || 3000
app.listen (PORT ,() => 
{
    console.log(`server is running on port : ${PORT}`)
})  