const express = require('express');
const Router = express.Router();
const userRoutes = require('./user-routes')
const messageRoutes = require('./message-routes')
const groupRoutes = require('./group-routes')
Router.use('/user', userRoutes);
Router.use('/messages', messageRoutes);
Router.use('/groups', groupRoutes);
module.exports = Router