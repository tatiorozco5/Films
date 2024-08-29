const { mongoose } = require('../config/db')

const DirectorSchema = new mongoose.Schema({
    Nombre_Director: {
        type: String,
        required: [true, 'El nombre del director es requerido'],
        minlength: [5, 'El nombre no debe ser menor a 5 Carateres']
    },
    Estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
}, {
    timestamps: true
})

const DirectorModel = mongoose.model('Director', DirectorSchema)

module.exports = DirectorModel