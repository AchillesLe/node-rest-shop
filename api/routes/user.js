const express = require("express");
const route = express.Router();
const userController = require('../controller/user');
const checkAuth = require('../middelware/check-auth');
//signup
route.post("/signup", userController.user_signup );
//login
route.post("/login", userController.user_login );
// delete
route.delete("/:userId", checkAuth ,userController.user_delete );

module.exports = route;