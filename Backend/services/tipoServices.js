const TipoModel = require('../models/TipoModel');

class TipoService {
    async createTipo(data) {
        try {
            const newTipo = await TipoModel.create(data);
            return newTipo;
        } catch (error) {
            console.error(error);
            return { error: 'Error al crear el tipo' };
        }
    }

    async getAllTipos() {
        try {
            const tipos = await TipoModel.find();
            return tipos;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener la lista de tipos' };
        }
    }

    async getTipoById(id) {
        try {
            const tipo = await TipoModel.findById(id);
            if (!tipo) {
                return { error: 'Tipo no encontrado' };
            }
            return tipo;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener el tipo' };
        }
    }

    async updateTipo(id, data) {
        try {
            const updatedTipo = await TipoModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedTipo) {
                return { error: 'Tipo no encontrado' };
            }
            return updatedTipo;
        } catch (error) {
            console.error(error);
            return { error: 'Error al actualizar el tipo' };
        }
    }

    async deleteTipo(id) {
        try {
            const deletedTipo = await TipoModel.findByIdAndDelete(id);
            if (!deletedTipo) {
                return { error: 'Tipo no encontrado' };
            }
            return deletedTipo;
        } catch (error) {
            console.error(error);
            return { error: 'Error al eliminar el tipo' };
        }
    }
}

module.exports = TipoService;
