
const article = require('../controllers/article.controller.js');
const contact = require ('../controllers/contact.controller')
const verify = require('../middlewares/verifyToken')
module.exports = (app) => {
  

    // Create a new article and comment
    app.post('/article',verify, article.create);
    app.post('/article/:articleId/comment',article.createComment)

    // Retrieve all articles and comment
    app.get('/article',  article.findAll);


    // Retrieve a single article with articleId and comment
    app.get('/article/:articleId', article.findOne);
    app.get('/article/:articleId/comment', article.getComment)

    // Update a article with articleId and comment
    app.put('/article/:articleId',verify,article.update);


    // Delete a article with articleId and comment
    app.delete('/article/:articleId',verify, article.delete);
 
    
//------------Contact route-----------



//the contact page

//send a message
app.post('/contact', contact.createMessage)

}

