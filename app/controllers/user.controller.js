
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
 const User = require('../models/User.Model')

  exports.register = async (req, res)=> {
    //Checking if the user is already in database
    const emailExist = await User.findOne ({email: req.body.email})
    if(emailExist) return res.status(400).send({message:'Email already exists', user: emailExist})
    const h = bcrypt.hashSync( req.body.password, 8);
    // create a new user
    const user = new User({
      fullName:req.body.fullName,
      email:req.body.email,
      password:h
    })
      user.save().then((newUser)=>{
        res.send({user:newUser})
      }).catch((err)=>{
        // console.log("error  ===", req.body, err);
        res.status(400).send({error:err.message})
      })
  }
    //LOGIN
   exports.login  = async(req,res) =>{
      User.find({email: req.body.email})
      .exec()
      .then(user => {
       console.log(user)
          bcrypt.compare(req.body.password, user.password, function(err, result) {
              if (result) {
                  const token = jwt.sign({
                      email: user.email
                    },process.env.TOKEN_SECRET, { expiresIn: '1h' });
                  return res.status(200).json({
                      message: "signed in successfully",
                      token: token
                  })
              }
              else{
  
                  return res.status(400).send({message: "Email and password are incorrect"})
              }
          });
      })
      .catch( error => {
          res.status(400).send(error.message)
      });

}
