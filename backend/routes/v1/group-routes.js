const express = require('express');
const Router = express.Router();
const { groupController } = require('../../controller');
Router.post("/", groupController.createGroup);
Router.get("/:userId", groupController.getGroupsByUserId);
module.exports = Router;