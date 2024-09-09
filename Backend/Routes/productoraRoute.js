const express = require('express');
const ProductoraService = require('../services/productoraServices');

function Productora (app) {
    const router = express.Router();
    const productoraService = new ProductoraService();

    app.use('/api/productora', router)

    router.get('/', async (req, res) => {
        const result = await productoraService.getAllProductoras();

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    })
    
    router.post('/create', async (req, res) => {
        const result = await productoraService.createProductora(req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(201).json(result);
    })

    router.get('/:id', async (req, res) => {
        const result = await productoraService.getProductoraById(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    })

    router.put('/update/:id', async (req, res) => {
        const result = await productoraService.updateProductora(req.params.id, req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    })

    router.delete('/:id', async (req, res) => {
        const result = await productoraService.deleteProductora(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    })
}

module.exports = Productora;