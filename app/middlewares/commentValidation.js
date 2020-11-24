const Joi  = require('joi')

const schema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required().email(),
    body:Joi.string().required(),
    article:Joi.string().required
})


exports.commentvalidation = (req,res,next)=>{
    const{error} = schema.validate(req.body)
    if(error){
        res.status(400).json({message: error.details[0].message})
    };
    next()
}


