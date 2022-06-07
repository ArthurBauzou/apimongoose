const mongoose = require('mongoose')

const userSchem = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    name : String,
    email : String,
    password : String,
    avatar : String,
    roles : [String]
})

module.exports = mongoose.model('user', userSchem)