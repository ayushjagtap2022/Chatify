const express = require('express');
const Router = express.Router();
const v1ApiRoutes = require('./v1')
Router.use('/v1', v1ApiRoutes)
module.exports = Router