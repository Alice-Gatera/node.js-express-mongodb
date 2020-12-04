const userController = require('../controllers/user.controller');
const userroutes = function(app) {
// app.post('/user/profile',userController.loginRequired, userController.profile);
   
app.post('/auth/register', userController.register);
app.post('/auth/signIn',  userController.login);
};
module.exports = userroutes