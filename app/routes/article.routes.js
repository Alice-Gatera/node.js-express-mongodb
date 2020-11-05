//article.routes.js
const article = require('../controllers/article.controller.js');

module.exports = (app) => {
  

    // Create a new article
    app.post('/article', article.create);

    // Retrieve all articles
    app.get('/article', article.findAll);

    // Retrieve a single article with articleId
    app.get('/article/:articleId', article.findOne);

    // Update a article with articleId
    app.put('/article/:articleId', article.update);

    // Delete a article with articleId
    app.delete('/article/:articleId', article.delete);
}