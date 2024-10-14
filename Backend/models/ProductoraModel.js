const { mongoose } = require('../config/db')

const ProductoraSchema = new mongoose.Schema({
    Nombre_Productora: {
        type: String,
        required: [true, 'El nombre de la productora es requerido']
    },
    Estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    Slogan: {
        type: String,
        required: [true, 'El slogan es requerido'],
        minlength: [10, 'EL Slogan debe ser mayor a 10 caracteres'],
        maxlength: [70, 'El Slogan debe ser menor a 50 caracteres']
    },
    Descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        maxlength: [200, 'La descripción debe ser menor a 100 caracteres']
    }
}, {
    timestamps: true,
})

const ProductoraModel = mongoose.model('Productora', ProductoraSchema)

module.exports = ProductoraModel;
