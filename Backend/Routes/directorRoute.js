const express = require("express")
const DirectorServices = require("../services/directorServices")

function Director(app){
    const router = express.Router()
    const directorserv = new DirectorServices()

    app.use("/api/director", router)

    router.get("/", async (req, res)=>{
        const directores = await directorserv.getallDirector()
        return res.json(directores)
    })

    router.post("/create", async (req, res)=>{
        const director = await directorserv.createDirector(req.body)
        return res.json(director)
    })

    router.get("/:id", async (req, res)=>{
        const directorid = await directorserv.getDirectorbyId(req.params.id)
        return res.json(directorid)
    })

    router.put("/update/:id", async (req, res)=>{
        const updatedirector = await directorserv.updateDirector(req.params.id, req.body)
        return res.json(updatedirector)
    })

    router.delete("/:id", async (req, res)=>{
        const deletedirector = await directorserv.deleteDirector(req.params.id)
        return res.json(deletedirector)
    })
}

module.exports = Director