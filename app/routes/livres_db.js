module.exports = (app) => {
    const livres = require('../controllers/livres.controller.js');
    
    app.get('/livres', livres.global_get);
    app.get('/livres/:id', livres.single_get);
    app.post('/livres', livres.create);
    app.delete('/livres/:id', livres.suppr);
    app.patch('/livres/:id', livres.modif);

}