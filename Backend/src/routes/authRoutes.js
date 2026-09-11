const express = require("express");
const { register, login ,logout,getMe} = require("../controllers/authControler");
const { protect } = require("../middleware/authMiddleware");

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.get("/me",protect,getMe)
authrouter.post("/logout", logout);

module.exports = authrouter;