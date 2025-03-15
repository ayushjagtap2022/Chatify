const express = require('express');
const Router = express.Router();
const { userController } = require('../../controller')
Router.post('/register', userController.createUser)
Router.post('/login', userController.loginUser)
module.exports = Router