const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');

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
app.listen(3000, () => {
    console.log("Node JS Server running on port 3000");
});