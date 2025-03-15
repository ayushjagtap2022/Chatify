const Group = require('../model/Groups');
const User = require('../model/User');

const createGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, members } = req.body;


        const memberEmails = members.map(member => member.email);


        const userDocs = await User.find({ email: { $in: memberEmails } });


        const validEmails = userDocs.map(user => user.email);


        const groupMembers = userDocs.map(user => ({
            userId: user._id,
            name: user.name,
            email: user.email
        }));


        const invalidEmails = memberEmails.filter(email => !validEmails.includes(email));


        if (invalidEmails.length > 0) {
            return res.status(400).json({
                error: "Some emails were invalid",
                invalidEmails
            });
        }


        const newGroup = new Group({
            groupName,
            groupDescription,
            members: groupMembers
        });

        const savedGroup = await newGroup.save();
        return res.status(200).json({ createdGroup: savedGroup });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the group" });
    }
};
const getGroupsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const groups = await Group.find({ "members.userId": userId });

        if (!groups) {
            return res.status(404).json({ message: 'No groups found for this user' });
        }

        res.status(200).json({ success: true, data: groups });
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    createGroup,
    getGroupsByUserId
};
