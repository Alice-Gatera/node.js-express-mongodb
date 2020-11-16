const userController = require('../controllers/user.controller');
 
const userroutes = function(app) {
// app.post('/user/profile',userController.loginRequired, userController.profile);
   
app.post('/auth/register',userController.register);
app.post('/auth/sign_in',userController.sign_in);
};
module.exports = userroutes