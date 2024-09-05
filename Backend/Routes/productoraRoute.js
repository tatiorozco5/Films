const express = require('express');
const productoraservice = require('../services/productoraServices')

function Productora (app) {
    const router = express.Router()
    const productoraserv = new productoraservice()

    app.use('/api/productora', router)

    router.get('/', async (req, res) => {
        const productoras = await productoraserv.getAllProductoras()
        return res.json(productoras)
    })
    
    router.post('/create', async (req, res) => {
        const newProductora = await productoraserv.createProductora(req.body)
        return res.json(newProductora)
    })

    router.get('/:id', async (req, res) => {
        const productoraById = await productoraserv.getProductoraById(req.params.id)
        return res.json(productoraById)
    })

    router.put('/update/:id', async (req, res) => {
        const updatedProductora = await productoraserv.updateProductora(req.params.id, req.body)
        return res.json(updatedProductora)
    })

    router.delete('/:id', async (req, res) => {
        const deletedProductora = await productoraserv.deleteProductora(req.params.id)
        return res.json(deletedProductora)
    })
}

module.exports = Productora;