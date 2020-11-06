const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
const userroutes = require('./app/routes/user.route')
const articleroutes = require('./app/routes/article.routes')
jsonwebtoken = require("jsonwebtoken");
// const dbConfig = require('./config/database.config');
require ('dotenv').config()
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Alice NODE.JS"});
});

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
userroutes(app)
articleroutes(app)

// listen for requests
const connection = async () => {
    try {
      const connect = await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log('Connected to DB');
    } catch (error) {
      console.log(error.message);
    }
  };
  connection();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Node JS Server running on port 3000");
});