const messageModel = require('../model/Message');

const saveMessage = async (data) => {
    try {
        const saveMsg = new messageModel({
            message: data.message,
            sender: {
                _id: data.sender._id,
                name: data.sender.name,
                email: data.sender.email
            },
            receiver: {
                _id: data.receiver._id,
                name: data.receiver.name,
                email: data.receiver.email
            },
            replyMessage: { ...data.replyMessage }
        });


        await saveMsg.save();
        return {
            data: saveMsg,
            message: "Message saved successfully"
        }
    } catch (error) {
        console.log({ Error: error });
        return { Error: error }

    }
};

const getMessages = async (req, res) => {
    try {
        const id = req.params.id;
        const otherId = req.query.otherId;
        if (!id) {
            return res.status(400).send({ msg: "User id required" });
        }
        const allMessages = await messageModel.find({
            $or: [
                { $and: [{ "sender._id": id }, { "receiver._id": otherId }] },
                { $and: [{ "sender._id": otherId }, { "receiver._id": id }] }
            ]
        });
        return res.status(200).send({
            data: allMessages,
            message: "allMessages"
        })
    } catch (error) {
        return res.status(500).send({ Error: error })
    }
}
const deleteMessages = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({ msg: "User id required" });
        }
        const deleteMsg = await messageModel.findByIdAndDelete(id)
        return res.status(200).send({
            data: deleteMsg,
            message: "allMessages"
        })
    } catch (error) {
        return res.status(500).send({ Error: error })
    }
}
module.exports = {
    saveMessage,
    getMessages,
    deleteMessages
};
