const { mongoose } = require('../config/db')

const TipoSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Descripcion: {
        type: String,
        maxlength: [100, 'La descripcion no debe ser mayor a 100 Carateres']
    }
}, {
    timestamps: true,
})

const TipoModel = mongoose.model('Tipo', TipoSchema)

module.exports = TipoModel