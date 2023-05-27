const express= require("express")
const cors= require("cors")
const app= express()
const mongoose= require("mongoose")
require("dotenv/config")

const authRoute= require("./routes/auth")
const uploadRoute= require("./routes/upload")
const imageRoute= require("./routes/image")


app.use(express.json())
app.use(cors())

mongoose.connect(
    process.env.DB_CONNECTION
    ).then(
        () => console.log("Connected to DB")
        ).catch(
            (err)=> {
                console.log(err)
            })


app.use("/api/auth", authRoute)
app.use("/api/upload", uploadRoute)
app.use("/api/image", imageRoute)


app.listen(process.env.PORT || 5001, ()=> {
    console.log("Listening on port: 5001")
})