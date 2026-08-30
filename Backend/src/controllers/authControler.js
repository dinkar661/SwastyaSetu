const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
const User = require("../models/user");

// register

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// logout

const logout = async (req,res)=>{

    try{
       // validate the token
       // Token add kar dunga Redis ke blocklist mai
       const {token} = req.cookies;

       const payload = jwt.decode(token);

       await redisClient.set(`token:${token}`,'Blocked');
       await redisClient.expireAt(`token:${token}`,payload.exp);
       // Cookies ko clear kar dena.....

       res.cookie("token",null,{expires: new Date(Date.now())});

       res.send("Logged Out Successfully");
        
    }
    catch(err){
        res.status(503).send("Error: "+err);
    }
}


module.exports = {
    register,
    login,
    logout
};