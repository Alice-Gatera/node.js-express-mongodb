const Joi = require('joi')

const contactSchema = Joi.object({
    name :Joi.string().required(),
    email: Joi.string().email().required().email(),
    message: Joi.string().required(),
})
exports.validationContact = (req,res,next)=>{
    const{error} = contactSchema.validate(req.body)
    if(error){
        res.status(400).json({message: error.details[0].message})
    };
    next()
}
