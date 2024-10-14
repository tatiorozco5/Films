const express = require('express');
const TipoService = require('../services/tipoServices')

function Tipos (app){
    const router = express.Router();
    const tipoService = new TipoService();
    
    app.use('/api/tipos', router);

    router.get('/', async (req, res) => {
        const result = await tipoService.getAllTipos();

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.post('/create', async (req, res) => {
        const result = await tipoService.createTipo(req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(201).json(result);
    });

    router.get('/:id', async (req, res) => {
        const result = await tipoService.getTipoById(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.put('/update/:id', async (req, res) => {
        const result = await tipoService.updateTipo(req.params.id, req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });
    
    router.delete('/:id', async (req, res) => {
        const result = await tipoService.deleteTipo(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });
}

module.exports = Tipos;