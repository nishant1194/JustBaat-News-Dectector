const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 

// Register a new user
exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(400).json({ user: users });
  } catch (err) {
    console.log(err);
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      } else {
        try {
          const newUser = new User({
            name: name,
            password: hash,
            email: email,
          });
          newUser
            .save()
            .then((result) => {
              console.log("object");
              res.status(201).json({
                success:true,
                newuser: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};
 

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          userType: user.userType,
        },
        "jaiShreeRam",
        { expiresIn: "3h" }
      );

      res.status(201).json({
        success:true,
        newuser:user
    
      });
    } else {
      res.status(401).json({ success:false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

 
 
 


