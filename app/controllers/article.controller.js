const cloudinary = require('cloudinary').v2
const upload = require('./upload')
//article.controller.js will have following methods :

const Article = require('../models/articles.model.js');
const Comment = require('../models/comments.model')
// const upload=  require('upload')
const path = require('path');

// Create and Save a new article

exports.create =async (req, res,next) => {
 
      //upload files 
      if(!req.files) return res.status(400).send("Field cannot be empty")
      const imageUrl = await upload.imageUpload(req.files.imageUrl)
      if(imageUrl == undefined) 
    //   return res.status(400).send("imageUrl cannot be empty")
      req.body.imageUrl =imageUrl
    // Create / post an article
    const article = new Article({
        title: req.body.title, 
         imageUrl :req.body.imageUrl,
        snippet: req.body.snippet,
        body:req.body.body,
    });
    // Save article in the database
    article.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.send({
            message: err.message || "Something went wrong."
        });
    });
};

// Retrieve and return all articles from the database.
exports.findAll = (req, res) => {
    Article.find().populate('comments')
    .then(articles => {
        res.send({ message: "success",articles

        });
    })
    // .catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Something went wrong."
    //     });
    // });
};

// Find a single article with a id
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId).populate('comments')
     
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article does not exist"
            });            
        }
        res.send(article);
    }).catch(err => {        
        return res.status(500).send({
            message: "Something went wrong."
        });
    });
};

// Update a article identified by the id in the request
exports.update = async (req, res) => {
    if(!req.body.title &&!req.body.snippet && !req.body.body) {
       return res.status(400).send("Submit the updated article");
    }
    if(!req.files) return res.status(400).send({message:"imageurl cannot be empt"})


    const imageUrl=  await upload.imageUpload(req.files.imageUrl)
if(imageUrl){
    req.body.imageUrl = imageUrl
    Article.findByIdAndUpdate(req.params.articleId, {
        title: req.body.title, 
        imageUrl:req.body.imageUrl,
        snippet: req.body.snippet,
        body:req.body.body
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article does not exist"
            });
        }
        res.send(article);
    }).catch(err => {        
        return res.status(500).send({
            message: "Something went wrong"
        });
    });
}
    // if (imageUrl== undefined) return res.status(400).send("imageurl cannot be empt")
    // req.body.imageUrl = imageUrl
 
    
}
// Delete a article with the specified articleId in the request
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article does not exist"
            });
        }
        res.send({message: "article deleted successfully!"});
    }).catch(err => {      
        return res.status(500).send({
            message: "Something went wrong"
        });
    });
};

// /COMMENTS

//Create comments
exports.createComment = (req, res)=>{
const articleId = req.params.articleId
    const comment = new Comment({
    name: req.body.name,
    email:req.body.email, 
    body: req.body.body,  
    article :articleId
    })
  
    // Save comment in the database
    comment.save()
    .then(data => {
        return res.status(200).send(data);
    })
}

//Read comment
exports.getComment = (req, res) => {
	Article.findById({_id: req.params.articleId}).populate ("comments")
    .then(article => {
        res.send(article);
    })
};




