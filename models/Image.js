const mongoose = require("mongoose")

const ImageSchema= new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        url: {
            type: String,
            required: true,
            unique: true
        }
    }, 
    {
        timestamps: true
    }
)

module.exports= mongoose.model('Image', ImageSchema)