
const article = require('../controllers/article.controller.js');

module.exports = (app) => {
  

    // Create a new article and comment
    app.post('/article',article.create);
    app.post('/article/:articleId/comment', article.createComment)

    // Retrieve all articles and comment
    app.get('/article', article.findAll);
    app.get('/article/:articleId/comment', article.getArticleComments)

    // Retrieve a single article with articleId and comment
    app.get('/article/:articleId', article.findOne);
    app.get('/article/:articleId/comment', article.getComment)

    // Update a article with articleId and comment
    app.put('/article/:articleId', article.update);
    app.put("/article/comment/:commentId", article.updateComment)

    // Delete a article with articleId and comment
    app.delete('/article/:articleId', article.delete);
    app.delete('article/comment/:commentId', article.deleteComment)
    
}
