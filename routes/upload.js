const router= require("express").Router()
const User = require("../models/User")
const Image = require("../models/Image")
const CryptoJS= require("crypto-js")
require("dotenv/config")
const jwt= require("jsonwebtoken")
const fs= require("fs")
const path= require("path")
const { ImgurClient } = require('imgur');
const { createReadStream } = require('fs');
const  { verifyToken } = require("./verifyToken")

const client = new ImgurClient({ clientId: '26f9fc7bbe6fee9' });

const multer= require("multer")

const storage= multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})

const upload = multer({ storage: storage })

router.post("/", verifyToken, upload.single('image'), async (req, res) => {

    const image= req.file.filename

    try{
        const response = await client.upload({
            image: createReadStream(`./uploads/${image}`),
            type: 'stream',
        });
        
        fs.unlinkSync(`./uploads/${image}`)
        
        const newImage= new Image({
            userID: req.user.id,
            name: req.body.imageName,
            url: response.data.link
        })

        const savedImage= await newImage.save()

        res.status(200).json(savedImage)
    }catch(err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.name) {
            res.status(400).json("Image name must be unique. Please choose a different name.");
        } else {
            res.status(500).json("An error occurred while uploading the image.");
        }      
    }
})



module.exports= router