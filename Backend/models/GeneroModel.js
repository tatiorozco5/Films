const { mongoose } = require('../config/db')

const GeneroSchema = new mongoose.Schema({
    Nombre:{
        type: 'string',
        required:[true,'El nombre es requerido'],
        minlength:[5, 'El nombre no debe ser menor a 5 Carateres']
    },
    Estado:{
        type:'string',
        enum :['Activo','Inactivo'],
        default:'Activo'
    },
    Descripcion:{
        type:'string',
        maxlength:[100,'La descripcion no debe ser mayor a 100 Carateres']
    }
}, {
    timestamps: true,
})

const GeneroModel = mongoose.model('Genero',GeneroSchema)

module.exports = GeneroModel