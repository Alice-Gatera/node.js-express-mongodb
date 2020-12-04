
const mongoose = require('mongoose')

const contactSchema =({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    message :{
        type: String,
        required: true,
    },
    date: {
        type:Date,
        default: Date.now(),
        required: true,
    },
})
module.exports= mongoose.model('contacts',contactSchema)