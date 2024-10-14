const express = require('express');
const MediaServices = require('../services/mediaServices');

function MediaRoutes(app) {
    const router = express.Router();
    const mediaService = new MediaServices();

    app.use('/api/media', router);

    router.post('/create', async (req, res) => {
        const result = await mediaService.createMedia(req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(201).json(result);
    });

    router.get('/', async (req, res) => {
        const result = await mediaService.getAllMedia();

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.get('/:id', async (req, res) => {
        const result = await mediaService.getMediaById(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.put('/update/:id', async (req, res) => {
        const result = await mediaService.updateMedia(req.params.id, req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.delete('/:id', async (req, res) => {
        const result = await mediaService.deleteMedia(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });
}

module.exports = MediaRoutes;
