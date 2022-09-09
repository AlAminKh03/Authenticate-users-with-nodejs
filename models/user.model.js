const mongoose = require('mongoose')


const UserShcema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createOnDate: {
        type: Date,
        default: Date.now
    }
})
const users = mongoose.model("registeredUsers", UserShcema)
module.exports = users 