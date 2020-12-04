const Messages = require('../models/contact.model')


//post a message and save it
exports.createMessage = async(req,res)=>{
const message = new Messages({
    name : req.body. name,
    email: req.body.email,
    message: req.body.message,
})
  // Save article in the database
  message.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Something went wrong."
      })
    })
}
