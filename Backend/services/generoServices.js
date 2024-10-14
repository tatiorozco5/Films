const GeneroModel = require('../models/GeneroModel');

class GeneroService {
    async createGenero(data) {
        try {
            const newGenero = await GeneroModel.create(data);
            return newGenero;
        } catch (error) {
            console.error(error);
            return { error: 'Error al crear el género' };
        }
    }

    async getAllGeneros() {
        try {
            const generos = await GeneroModel.find();
            return generos;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener la lista de géneros' };
        }
    }

    async getGeneroById(id) {
        try {
            const genero = await GeneroModel.findById(id);
            if (!genero) {
                return { error: 'Género no encontrado' };
            }
            return genero;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener el género' };
        }
    }

    async updateGenero(id, data) {
        try {
            const updatedGenero = await GeneroModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedGenero) {
                return { error: 'Género no encontrado' };
            }
            return updatedGenero;
        } catch (error) {
            console.error(error);
            return { error: 'Error al actualizar el género' };
        }
    }

    async deleteGenero(id) {
        try {
            const deletedGenero = await GeneroModel.findByIdAndDelete(id);
            if (!deletedGenero) {
                return { error: 'Género no encontrado' };
            }
            return deletedGenero;
        } catch (error) {
            console.error(error);
            return { error: 'Error al eliminar el género' };
        }
    }
}

module.exports = GeneroService;
