const Livres = require('../models/livres')

exports.global_get = async (req, res) => {
    if (req.query.id) {
        const livre = await Livres.findOne({_id:req.query.id})
        res.json(livre)
    } else {
        const toutleslivres = await Livres.find()
        res.json(toutleslivres)
    }
}

exports.create = async (req, res) => {
    const titre = req.body.titre
    const auteur = req.body.auteur
    const genre = req.body.genre

    if ( !titre || !auteur || !genre) {
        res.status(400).send({
            message: 'il manque un argument'
        })
        return
    }

    const nouveau_livre = new Livres({
        titre : titre,
        auteur : auteur,
        genre : genre
    })

    await nouveau_livre.save()
    res.json(nouveau_livre)
}


exports.single_get = (req, res) => {
    const id = req.params.id
    Livres.findById(id)
    .then(livre => {
        if (!livre) {
            return res.status(404).send({
                message: 'Il n’existe aucun livre avec l’identifiant ' + id
            })
        }
        res.json(livre)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Il n’existe aucun livre avec l’identifiant ' + id
            })
        }
        return res.status(500).send({
            message: 'Un truc pas cool est arrivé et ça n’a pas fonctionné. Id = ' + id
        })
    })
}

exports.suppr = async (req, res) => {
    const id = req.params.id
    const suppr = await Livres.deleteOne({_id: id})
    res.json(suppr)
}

exports.modif = async (req, res) => {
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
}