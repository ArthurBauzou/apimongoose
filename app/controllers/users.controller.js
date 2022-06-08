const Users = require('../models/users')

exports.global_get = async (req, res) => {
    const users = await Users.find()
    res.json(users)
}

exports.create = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    const roles = req.body.roles;

    if ( !username ) {
        res.status(400).send('entrez au moins un nom d’utilisateur')
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

    await nouvel_utilisateur.save();
    res.json(nouvel_utilisateur)
}

exports.modif = (req, res) => {
    
    const id = req.params.id
    const username = req.body.username
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const avatar = req.body.avatar
    const roles = req.body.roles
    // ERR : patch vide
    if (!username && !name && !email && !password && !avatar && !roles) {
        return res.status(500).send({message: 'patch vide'})
    }

    const user = Users.findById(id).then(user => {
        // ERR : no user found
        if (!user) { return res.status(404).send({message: 'no user with id ' + id}) }

        // action du patch
        if (username)   { user.username = username }
        if (name)       { user.name = name }
        if (email)      { user.email = email }
        if (password)   { user.password = password }
        if (avatar)     { user.avatar = avatar }
        if (roles && req.query.addroles) {
            for (let role of roles) { user.roles.push(role) }
        } else if (roles) { user.roles = roles }
        
        user.save()
            .then(r => { res.json(r) })
            .catch(e => { return res.status(406).send(e) })
            
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({message: `No user with Id = ${err.value}`})
        }
        return res.status(500).send({message: 'erreur', err})
    })

}