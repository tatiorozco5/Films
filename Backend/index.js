const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { port } = require('./config')
const { connection } = require('./config/db')

const genero = require("./Routes/generoRoute")
const director = require("./Routes/directorRoute")
const productora = require("./Routes/productoraRoute")
const tipo = require("./Routes/tipoRoute")
const media = require("./Routes/mediaRoute")

const app = express()
connection()

const cosrOptions = {
    origin:'http://localhost:3000',
    methods:'get,put,post,DELETE',
    credentials:true
}

app.use(cors(cosrOptions))

app.use(express.json())
app.use(morgan('dev'))

genero(app)
director(app)
productora(app)
tipo(app)
media(app)

app.get("/", (req, res) => {
    return res.json({ name: "api films" })
})

app.listen(port, () => {
    console.log(`El servidor esta corriendo en http://localhost:${port}`)
})