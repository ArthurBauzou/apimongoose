const express = require('express')
const mongoose = require('mongoose')
const bodP = require('body-parser')

const dbconfig = require('../config/database.config')
const dbname = 'livres'
mongoose.connect(dbconfig.url+dbname+dbconfig.options, err => {
        if(err) throw 'erreur d’accès à la base mongo: ',err;
        console.log('connecté à mongo')
})

let app = express();
let port = 8080;

app.use(bodP.urlencoded({extended: true}))
app.use(bodP.json())

// ROUTES
app.get('/', function(req, res) {
    res.send('<h1>salut</h1><p>coucou</p>')
})
require('./routes/acces_db.js')(app)

// SERVER
app.listen(port, () =>  {
    console.log('le serveur fonctionne')
})

