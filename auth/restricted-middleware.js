const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // place where we expect to find our token
  const token = req.headers.authorization;

  // see if there is a token
  // check if token is valid -> rehash the header + payload + secret 
  // and see if it matches our verify signature
  
  if(token) {
    // checking if verify signature is valid
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if(error) {
        console.log('failed verify', error)
        res.status(401).json({
          message: 'not verified'
        })
      } else {
        // token is valid
        req.decodedToken = decodedToken
        next();
      }
    })
  } else {
    res.status(400).json({
      message: 'no token provided'
    })
  }
};
