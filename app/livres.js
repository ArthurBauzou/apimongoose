const mongoose = require('mongoose')

const livreSchem = mongoose.Schema({
    titre : String,
    auteur : String,
    genre : String
})

module.exports = mongoose.model('livre', livreSchem)