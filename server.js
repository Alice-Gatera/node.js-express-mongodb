const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
const mongoDBErrors = require('mongoose-mongodb-errors')
mongoose.plugin(mongoDBErrors)
const userroutes = require('./app/routes/user.route')
const articleroutes = require('./app/routes/article.routes');
const fileUpload = require('express-fileupload');
app.use (fileUpload({ useTempFiles:true}))
 const jsonwebtoken = require("jsonwebtoken");

// const dbConfig = require('./config/database.config');
 const dotenv = require ('dotenv').config()
 
//  const error =require('express-async-errors')

const util = require ('util')
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Alice NODE.JS"});
});

app.use(function(req, res, next) {
  if (req.headers && req.headers['auth-token']){
    jsonwebtoken.verify(req.headers['auth-token'], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      return next();
    });
  } else {
    req.user = undefined;
    return next();
  }
});
// const userroutes = require('./app/routes/user.route')
userroutes(app);
articleroutes(app);

//upload images on blog
app.use(fileUpload({
  useTempFiles:true,
}))

// listen for requests
const connection = async () => {
  console.log(process.env.DB_CONNECTION);
    try {
      const connect = await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex:true
      });
      console.log('Connected to DB');
    } catch (error) {
      // console.log(error.message);
    }
  };
connection();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Node JS Server running on port 3000");
});
module.exports = app;