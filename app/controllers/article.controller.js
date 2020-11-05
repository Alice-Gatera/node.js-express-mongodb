//article.controller.js will have following methods :

const Article = require('../models/articles.model.js');

// Create and Save a new article
exports.create = (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }
    // Create a article
    const article = new Article({
        title: req.body.title, 
        snippet: req.body.snippet,
        body:req.body.body
    });

    // Save article in the database
    article.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
};

// Retrieve and return all articles from the database.
exports.findAll = (req, res) => {
    Article.find()
    .then(articles => {
        res.send({ message: "success",articles

        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
};

// Find a single article with a id
exports.findOne = (req, res) => {
	Article.findById(req.params.articleId)
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
exports.update = (req, res) => {
    if(!req.body.title || !req.body.snippet || !req.body.body) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }
     // Find article and update it with the request body
    Article.findByIdAndUpdate(req.params.articleId, {
        title: req.body.title, 
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
};

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