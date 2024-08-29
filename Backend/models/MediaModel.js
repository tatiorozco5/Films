const { mongoose } = require('../config/db')

const MediaSchema = new mongoose.Schema({
    Serial: {
        type: String,
        required: true,
        unique: true
    },
    Titulo: {
        type: String,
        required: true,
        minlength: [5, 'El titulo no debe ser menor a 5 caracteres'],
        maxlength: [50, 'El titulo no debe ser mayor a 50 caracteres']
    },
    Sinopsis: {
        type: String,
        required: true,
        minlength: [100, 'La sinopsis no debe ser menor a 100 caracteres'],
        maxlength: [500, 'La sinopsis no debe ser mayor a 500 caracteres']
    },
    Url: {
        type: String,
        required: true,
        unique: true
    },
    Imagen: {
        type: String,
        required: true
    },
    AnoEstreno: {
        type: Number,
        required: true
    },
    Genero: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Genero',
        required: true
    },
    Director: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Director',
        required: true
    },
    Productora: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Productora',
        required: true
    },
    Tipo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tipo',
        required: true
    }
}, { timestamps: true })

const MediaModel = mongoose.model('Media', MediaSchema)

module.exports = MediaModel