const mongoose = require('mongoose');
require('dotenv').config();
const databaseConnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/chatApp" || process.env.MONGO_DB_URI);
        console.log("Mongo db Connected");
    } catch (err) {
        console.log(err);
    }
}
module.exports = databaseConnection