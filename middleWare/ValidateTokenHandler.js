const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = asyncHandler(async(req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;
  if(authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
        res.status(401).json({error: "User is not Authorized"});
      }
      req.user = decoded.user;
      next();
    });

    if(!token) {
      res.status(401).json({error: "User is not authorized"});
    }
  }
})

module.exports = { validateToken }