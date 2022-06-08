const mongoose = require('mongoose')

const userSchem = mongoose.Schema({
    username : {
        type: String,
        required: true,
        lowercase: true
    },
    name : String,
    email : String,
    password : {
        type: String,
        minlength: 8,
        match: new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$')
    },
    avatar : String,
    roles : [{
        type: String,
        uppercase: true
    }]
})

module.exports = mongoose.model('user', userSchem)