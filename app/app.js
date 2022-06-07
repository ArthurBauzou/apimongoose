const express = require('express')
const mongoose = require('mongoose')
const Livres = require('./livres.js')
const Users = require('./users.js')
const bodP = require('body-parser')

mongoose.connect('mongodb+srv://arthurbauzou:XyoeeiDCYIHAFdt2@cluster0.7vk8b.mongodb.net/livres?retryWrites=true&w=majority'
,err => {
    if(err) throw 'erreur d’accès à la base mongo: ',err;
    console.log('connecté à mongo')
})

let app = express();
let port = 8080;

app.use(bodP.urlencoded({
    extended: true
}))
app.use(bodP.json())

app.get('/', function(req, res) {
    res.send('<h1>salut</h1><p>coucou</p>')
})

app.post('/livres', async (req, res) => {
    const titre = req.body.titre
    const auteur = req.body.auteur
    const genre = req.body.genre

    if ( !titre || !auteur || !genre) {
        res.send('il manque un argument')
        return
    }

    const nouveau_livre = new Livres({
        titre : titre,
        auteur : auteur,
        genre : genre
    })

    await nouveau_livre.save()
    res.json(nouveau_livre)
})

app.get('/livres', async (req, res) => {
    if (req.query.id) {
        const livre = await Livres.findOne({_id:req.query.id})
        res.json(livre)
    } else {
        const livres = await Livres.find()
        res.json(livres)
    }
})

app.get('/livres/:id', async (req, res) => {
    const id = req.params.id
    const livre = await Livres.findOne({_id : id})
    res.json(livre)
})

app.delete('/livres/:id', async (req, res) => {
    const id = req.params.id
    const suppr = await Livres.deleteOne({_id: id})
    res.json(suppr)
})

app.patch('/livres/:id', async (req, res) => {
    const id = req.params.id
    const livre = await Livres.findOne({_id : id})

    const titre = req.body.titre
    const auteur = req.body.auteur
    const genre = req.body.genre

    if (titre) { livre.titre = titre }
    if (auteur) { livre.auteur = auteur }
    if (genre) { livre.genre = genre }

    let patch = await livre.save()

    res.json(patch)
})

app.listen(port, () =>  {
    console.log('le serveur fonctionne')
})

app.get('/users', async (req, res) => {
    const users = await Users.find()
    res.json(users)
})

app.post('/users', async (req, res) => {
    const username = req.body.username
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const avatar = req.body.avatar
    const roles = req.body.roles

    if ( !username ) {
        res.send('entrez au moins un nom d’utilisateur')
        return
    }

    const nouvel_utilisateur = new Users({
        username: username,
        name: name,
        email: email,
        password: password,
        avatar: avatar,
        roles: roles,
    })

    await nouvel_utilisateur.save()
    res.json(nouvel_utilisateur)
})

app.patch('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await Users.findOne({_id : id})

    const username = req.body.username
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const avatar = req.body.avatar
    const roles = req.body.roles

    if (username)   { user.username = username }
    if (name)       { user.name = name }
    if (email)      { user.email = email }
    if (password)   { user.password = password }
    if (avatar)     { user.avatar = avatar }
    if (roles)      { user.roles = roles }

    let patch = await user.save()

    res.json(patch)
})