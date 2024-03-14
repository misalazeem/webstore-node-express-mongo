const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User Registration endpoint
//Access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({ error: "All fields are mandatory" });
      return;
    }
    
    const checkEmail = await User.findOne({ email });
    
    if(checkEmail) {
      res.status(400).json({ error: "Email already taken" });
      return;
    }

    const checkUserName = await User.findOne({ username });

    if (checkUserName) {
      res.status(400).json({ error: "Username already taken" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);
    const newUser = await User.create({
        username,
        email,
        password: hashed
    });

    if(newUser) {
      res.status(201).json({_id: newUser.id, email: newUser.email})
    } else {
      res.status(400).json({error: "Something went Wrong"});
    }
});

//User Login endpoint
//Access Public
const loginUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body;
    if (!email || !password) {
      res.status(401).json({error: "All fields are mandatory"});
    }

    const userExists = await User.findOne({ email });

    if(userExists && (await bcrypt.compare(password, userExists.password))) {
      const access_token = jwt.sign({
        user: {
          username: userExists.username,
          email: userExists.email,
          id: userExists._id,
        }, 
      }, process.env.JWT_SECRET, { expiresIn: "60m"}
      );
      res.status(200).json({ access_token });
    } else {
      res.status(401).json({error: "Credentials don't match"});
    }
    
});

//Current User endpoint
//Access Private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser }