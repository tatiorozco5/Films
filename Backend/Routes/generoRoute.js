const express = require("express")
const generoServices = require("../services/generoServices")

function Genero (app) {
    const router = express.Router()
    const generoServ = new generoServices()

    app.use("/api/genero",router)

    router.get("/", async (req,res)=>{
       
            const generos = await generoServ.getallGeneros()
            //return generos
            return res.json(generos)
        
    })
    router.post("/create",async (req,res) => {
        console.log(req.body);
        
        const genero = await generoServ.createGenero(req.body)
        return res.json(genero)
    })
    router.get("/:id", async (req,res)=>{
        const generoid = await generoServ.getGenerobyId(req.params.id)
        return res.json(generoid)
    })
    router.put("/update/:id",async (req,res) => {
        const updategenero = await generoServ.updateGenero(req.params.id, req.body)
        return res.json(updategenero)
    })
    router.delete("/:id", async (req,res) => {
        const deletegenero = await generoServ.deleteGenero(req.params.id)
        return res.json(deletegenero)
    })
}

module.exports = Genero