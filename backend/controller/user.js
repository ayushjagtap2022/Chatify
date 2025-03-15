const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { token } = require('../utils')
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(401).json({ error: "Email already taken" });
        }


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const newUser = new User({
            name,
            email,
            password: hash
        });

        const savedUser = await newUser.save();


        const generatedToken = await token.generateToken(savedUser);

        return res.status(200).json({ token: generatedToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "An error occurred while creating the user" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ Error: "Email or password is invalid" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ Error: "Email or password is invalid" });
        }
        const generatedToken = await token.generateToken(user);


        return res.status(200).json({ token: generatedToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while logging in" });
    }
};
module.exports = {
    createUser, loginUser
}