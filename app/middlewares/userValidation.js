const Joi = require('joi')

const registerValidation =(data)=>{
    const userSchema =Joi.object({
        fullName :Joi.string().min(6).required(),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
}
 const loginValidation =(data)=>{
     const userSchema ={
         email: Joi.string()
         .min(6)
         .required()
         .email(),

         password: Joi.string()
         .min(6)
         .required()
     }
     return Joi.validate(data,userSchema)
 }
module.exports.registerValidation =registerValidation
module.exports.loginValidation =loginValidation




