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
    replyMessage: {},
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});


const GroupMessages = mongoose.model("GroupMessages", messageSchema);


module.exports = GroupMessages;