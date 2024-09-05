const TipoModel = require('../models/TipoModel')

class Tipo {
    async getAllTipos() {
        try {
            const tipos = await TipoModel.find()
            return tipos
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getTipoById(id) {
        try {
            const tipo = await TipoModel.findById(id)
            return tipo
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async createTipo(data) {
        try {
            const newTipo = await TipoModel.create(data)
            return newTipo
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async updateTipo(id, data) {
        try {
            const updatedTipo = await TipoModel.findByIdAndUpdate(id, data, { new: true })
            return updatedTipo
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteTipo(id) {
        try {
            const deletedTipo = await TipoModel.findByIdAndDelete(id)
            return deletedTipo
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = Tipo