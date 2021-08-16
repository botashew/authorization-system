const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLenth: 1
    },
    lastName: {
        type: String,
        required: true,
        minLenth: 1
    },
    email: {
        type: String,
        required: true,
        minLenth: 3
    },
    password: {
        type: String,
        required: true
    }
})

const model = mongoose.model('User', schema)

module.exports = model