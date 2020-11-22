const Joi = require('joi')

const contacSchema = Joi.object({
    name :Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
})
const validationContact = (req,res,next)=>{
    const{error} = schema.validate(req.body)
    if(error){
        res.status(400).json({message: error.details[0].message})
    };
    next()
}
module.exports = validationContact