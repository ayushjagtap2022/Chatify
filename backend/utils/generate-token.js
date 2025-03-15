const jwt = require('jsonwebtoken')
const generateToken = async (user) => {
    let token = jwt.sign({ user: { name: user.name, email: user.email, _id: user._id } }, "computer", { algorithm: 'HS256', expiresIn: "1h" });
    return token
}
module.exports = {
    generateToken
}