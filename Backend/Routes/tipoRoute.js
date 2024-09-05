const express = require('express');
const tiposervices = require('../services/tipoServices')

function Tipos (app){
    const router = express.Router();
    const tiposerv = new tiposervices();
    
    app.use('/api/tipos', router);

    router.get('/', async (req, res) => {
        const tipos = await tiposerv.getAllTipos();
        return res.json(tipos);
    });

    router.post('/create', async (req, res) => {
        const newTipo = await tiposerv.createTipo(req.body);
        return res.json(newTipo);
    });

    router.get('/:id', async (req, res) => {
        const tipo = await tiposerv.getTipoById(req.params.id);
        return res.json(tipo);
    });

    router.put('/update/:id', async (req, res) => {
        const updatedTipo = await tiposerv.updateTipo(req.params.id, req.body);
        return res.json(updatedTipo);
    });
    
    router.delete('/:id', async (req, res) => {
        const deletedTipo = await tiposerv.deleteTipo(req.params.id);
        return res.json(deletedTipo);
    });
}

module.exports = Tipos;