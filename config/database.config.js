const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect("mongodb+srv://alice:alice2020@projectdb.geq50.mongodb.net/capstone?retryWrites=true&w=majority")
.then(() => {
    console.log("Connection successfully established");    
}).catch(err => {
    console.log('Could not connect to the database. '+err);
    process.exit();
});