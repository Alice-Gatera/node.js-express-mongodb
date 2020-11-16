const mongoose = require('mongoose');
const articleModel = require('../controllers/article.controller');

const commentSchema = mongoose.Schema({
    name: {
       type: String,
       required: true,
    },
    email:{
        type:String,
        required: true,
    },
    body:{ 
        type:String,
        required: true,
}, 
article:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'articles',
    required:true
},
    timestamps:{
        type: Date,
        default:Date.now(),
        required:true
    }
});

module.exports = mongoose.model('comments', commentSchema);