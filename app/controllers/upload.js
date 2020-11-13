;
const cloudinary = require('cloudinary').v2
const dotenv  =require ('dotenv').config()
const fileUpload = require('express-fileupload');
// app.use (fileUpload())

 //cloudinary config
 

 cloudinary.config({
     api_key: process.env.api_key,
     api_secret:process.env.api_secret,
     cloud_name:process.env.cloud_name
 })
exports.imageUpload = async(data) =>{
    if (data == undefined) return undefined
    try{
        const result = await cloudinary.uploader.upload(data.tempFilePath)
        return result.url
    }catch(error){
        console.log(error);
        return null
    }
}

