const express = require ('express')
const connectDB = require ('./src/config/db.js')
const CourseRoute = require ('./src/routers/courseRouter.js')
const StudentRoute = require ('./src/routers/studentRouter.js')
const InstructorRouter = require ('./src/routers/instructorRouter.js')
const ExamRouter = require ('./src/routers/examRouter.js')
const AdminRouter = require ('./src/routers/adminRoutes.js')
const masterAdminRouter = require ('./src/routers/masterAdminRoutes.js')
const modalRouter = require ('./src/routers/modalRoutes.js')


require ('dotenv').config()

const app = express ()

connectDB()
app.use (express.json())


app.use ('/api' , CourseRoute)
app.use ('/api' , StudentRoute)
app.use ('/api' , InstructorRouter)
app.use ('/api' , ExamRouter)
app.use ('/api' , AdminRouter)
app.use ('/api' , masterAdminRouter)
app.use ('/api' , modalRouter)


const PORT = process.env.PORT || 3000
app.listen (PORT ,() => 
{
    console.log(`server is running on port : ${PORT}`)
})  