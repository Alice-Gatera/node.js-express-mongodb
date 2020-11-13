
const article = require('../controllers/article.controller.js');

module.exports = (app) => {
  

    // Create a new article
    app.post('/article',article.create);

    // Retrieve all articles
    app.get('/article', article.findAll);

    // Retrieve a single article with articleId
    app.get('/article/:articleId', article.findOne);

    // Update a article with articleId
    app.patch('/article/:articleId', article.update);
    // app.put("comment/:commentId", Comment.update)

    // Delete a article with articleId
    app.delete('/article/:articleId', article.delete);
    // app.delete('/comment/:commentId',comment.delete)
}
