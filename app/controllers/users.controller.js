



// app.get('/users', async (req, res) => {
//     const users = await Users.find()
//     res.json(users)
// })

// app.post('/users', async (req, res) => {
//     const username = req.body.username
//     const name = req.body.name
//     const email = req.body.email
//     const password = req.body.password
//     const avatar = req.body.avatar
//     const roles = req.body.roles

//     if ( !username ) {
//         res.send('entrez au moins un nom d’utilisateur')
//         return
//     }

//     const nouvel_utilisateur = new Users({
//         username: username,
//         name: name,
//         email: email,
//         password: password,
//         avatar: avatar,
//         roles: roles,
//     })

//     await nouvel_utilisateur.save()
//     res.json(nouvel_utilisateur)
// })

// app.patch('/users/:id', async (req, res) => {
//     const id = req.params.id
//     const user = await Users.findOne({_id : id})

//     const username = req.body.username
//     const name = req.body.name
//     const email = req.body.email
//     const password = req.body.password
//     const avatar = req.body.avatar
//     const roles = req.body.roles

//     if (username)   { user.username = username }
//     if (name)       { user.name = name }
//     if (email)      { user.email = email }
//     if (password)   { user.password = password }
//     if (avatar)     { user.avatar = avatar }
//     if (roles)      { user.roles = roles }

//     let patch = await user.save()

//     res.json(patch)
// })