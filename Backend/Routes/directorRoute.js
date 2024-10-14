const express = require("express")
const DirectorServices = require("../services/directorServices")

function Director(app){
    const router = express.Router()
    const directorService = new DirectorServices()

    app.use("/api/director", router)

    router.get("/", async (req, res) => {
        const result = await directorService.getAllDirectors();

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.post("/create", async (req, res) => { 
        const director = await directorService.createDirector(req.body);
        return res.json(director);
    });

    router.get("/:id", async (req, res) => {
        const result = await directorService.getDirectorById(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.put("/update/:id", async (req, res) => {
        const result = await directorService.updateDirector(req.params.id, req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });

    router.delete('/:id', async (req, res) => {
        const result = await directorService.deleteDirector(req.params.id);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json(result);
    });
}

module.exports = Director