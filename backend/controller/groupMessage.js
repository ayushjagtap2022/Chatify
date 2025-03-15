const groupMessageModel = require('../model/GroupMessages');
const saveGroupMessage = async (data) => {
    try {
        const saveGroupMessge = new groupMessageModel({
            message: data.message,
            sender: {
                _id: data.senderId,
                name: data.senderName,
                email: data.senderEmail
            },
            groupId: data.groupId
        });


        await saveGroupMessge.save();
        return {
            data: saveGroupMessge,
            message: "Message saved successfully"
        }
    } catch (error) {
        console.log({ Error: error });
        return { Error: error }

    }
};
module.exports = {
    saveGroupMessage
}