const Joi = require('joi')

const schema = Joi.object({
    fullName :Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required()
})

const validation = (req,res,next)=>{
    const{error} = schema.validate(req.body)
    if(error){
        res.status(400).json({message: error.details[0].message})
    };
    next()
}
module.exports = validation