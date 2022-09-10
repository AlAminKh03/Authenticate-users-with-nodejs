const mongoose = require('mongoose')
// var encrypt = require('mongoose-encryption');


const UserSchema = mongoose.Schema({
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

// Implementation of mongoose encrypt 
// const encKey = process.env.ENC_KEY

// // encrypt age regardless of any other options. name and _id will be left unencrypted
// UserSchema.plugin(encrypt,
//     {
//         secret: encKey,
//         encryptedFields: ['password']
//     });

const users = mongoose.model("registeredUsers", UserSchema)
module.exports = users 