const router= require("express").Router()
const User = require("../models/User")
const Image = require("../models/Image")
const CryptoJS= require("crypto-js")
require("dotenv/config")
const jwt= require("jsonwebtoken")
const fs= require("fs")
const path= require("path")
const  { verifyToken } = require("./verifyToken")


router.get("/find/:userId", verifyToken, async (req, res) => {
    try {
        const foundImages= await Image.find({userID: req.params.userId})
        res.status(200).json(foundImages)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports= router