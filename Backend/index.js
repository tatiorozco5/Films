const express=require('express')
const morgan=require('morgan')

const{port}=require('./config')
const{connection}=require('./config/db')

const genero = require("./Routes/generoRoute")
const director = require("./Routes/directorRoute")
const productora = require("./Routes/productoraRoute")


const app=express()
connection()

app.use(express.json())
app.use(morgan('dev'))

genero(app)
director(app)
productora(app)

app.get("/",(req,res)=>{
    return res.json({name:"api films"})
})

app.listen(port,()=>{
    console.log(`El servidor esta corriendo en http://localhost:${port}`)
})