const Joi = require('joi')
const articleSchema = Joi.object({

        title: Joi.string().required(),
        snippet:Joi.string().required(),
        body: Joi.string().required()
    })
    exports.articleValidation = (req,res,next)=>{
        const{error} = articleSchema.validate(req.body)
        if(error){
            res.status(400).json({message: error.details[0].message})
        };
        next()
    }
    