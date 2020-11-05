const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
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

require('./app/routes/article.routes')(app);

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