//comment.routes.js
const comment = require('../controllers/comment.controller.js');

module.exports = (app) => {

    //create omment
    app.post ('/:articleId/comment',comment.create)
    
    //Read comment
    app.get('/:articleId/comment', article.findOne)

    // edit comment
    app.put('/comment/:commentId',comment.update)
    
    //delete comment
    app.delete('/comment/:commentID', comment.delete)
}