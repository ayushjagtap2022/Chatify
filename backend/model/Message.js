const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
        // index: true
    },
    sender: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    receiver: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    replyMessage: {},
}, {
    timestamps: true,
    versionKey: false
});


const Message = mongoose.model("Message", messageSchema);


module.exports = Message;
