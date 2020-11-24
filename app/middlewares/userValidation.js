var Joi = require('@hapi/joi')

exports.registerValidation =(req, res, next)=>{
    const userSchema =Joi.object({
        fullName :Joi.string().min(6).required(),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    const {error} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send({error:error.details[0].message})
    }
    return next()
}
exports.loginValidation =(req, res, next)=>{
     const userSchema =Joi.object({
         email: Joi.string()
         .min(6)
         .required()
         .email(),

         password: Joi.string()
         .min(6)
         .required()
     })
     const {error} = userSchema.validate(req.body)
     if(error){
         return res.status(400).send({error:error.details[0].message})
     }
     return next()
    }




