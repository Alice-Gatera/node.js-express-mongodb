const Joi = require('joi')

//validate user login
const schema = Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required()
})

const validationLogin = (req,res,next)=>{
    const{error} = schema.validate(req.body)
    if(error){
        res.status(400).json({message: error.details[0].message})
    };
    next()
}
module.exports = validationLogin