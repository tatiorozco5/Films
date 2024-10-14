const express = require("express")
const GeneroService = require('../services/generoServices');

function Genero(app) {
    const router = express.Router();
    const generoService = new GeneroService();

    app.use("/api/genero", router)

    router.get('/', async (req, res) => {
        const result = await generoService.getAllGeneros();

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.post("/create", async (req, res) => {
        const result = await generoService.createGenero(req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(201).json(result);
    })
    router.get('/:id', async (req, res) => {
        const result = await generoService.getGeneroById(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });
    router.put("/update/:id", async (req, res) => {
        const result = await generoService.updateGenero(req.params.id, req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    })
    router.delete("/:id", async (req, res) => {
        const result = await generoService.deleteGenero(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    })
}

module.exports = Genero