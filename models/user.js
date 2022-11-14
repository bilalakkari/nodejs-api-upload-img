const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    pwd: { type: String, required: true },
    userProfile: { type: String, required: true },
});

module.exports = mongoose.model('Users', userSchema);