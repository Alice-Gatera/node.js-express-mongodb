const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: String,
    snippet: String,
    body:String
}, {
    timestamps: true
});

module.exports = mongoose.model('articles', articleSchema);