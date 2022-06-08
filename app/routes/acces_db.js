
// Ce fichier rassemble les routes d’accès aux données JSON depuis mongodb

module.exports = (app) => {
    const livres = require('../controllers/livres.controller.js');
    const users = require('../controllers/users.controller.js')
    
    // pour les livres
    app.get('/livres', livres.global_get);
    app.get('/livres/:id', livres.single_get);
    app.post('/livres', livres.create);
    app.delete('/livres/:id', livres.suppr);
    app.patch('/livres/:id', livres.modif);

    // pour les utilisateurs
    app.get('/users', users.global_get);
    app.post('/users', users.create);
    app.patch('/users/:id', users.modif);

}