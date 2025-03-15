const express = require('express');
const Router = express.Router();
const { messageController } = require('../../controller')
Router.get("/:id", messageController.getMessages)
Router.delete("/:id", messageController.deleteMessages)
module.exports = Router