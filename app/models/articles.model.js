const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
       type: String,
       required: true,
    },
    imageUrl:{
        type:String,
    
    },
    snippet:{
     type: String,
     required: true,
    },
    body:{ 
        type:String,
        required: true,
},
comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comments",
    required:true
}] ,
    timestamps: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('articles', articleSchema);