const DirectorModel = require('../models/DirectorModel');

class DirectorService {
    async createDirector(data) {
        try {
            const newDirector = await DirectorModel.create(data);
            return newDirector;
        } catch (error) {
            console.error(error);
            return { error: 'Error al crear el director' };
        }
    }

    async getAllDirectors() {
        try {
            const directors = await DirectorModel.find(({ Estado: 'Activo' }));
            return directors;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener la lista de directores' };
        }
    }

    async getDirectorById(id) {
        try {
            const director = await DirectorModel.findById(id);
            if (!director) {
                return { error: 'Director no encontrado' };
            }
            return director;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener el director' };
        }
    }

    async updateDirector(id, data) {
        try {
            const updatedDirector = await DirectorModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedDirector) {
                return { error: 'Director no encontrado' };
            }
            return updatedDirector;
        } catch (error) {
            console.error(error);
            return { error: 'Error al actualizar el director' };
        }
    }

    async deleteDirector(id) {
        try {
            const deletedDirector = await DirectorModel.findByIdAndDelete(id);
            if (!deletedDirector) {
                return { error: 'Director no encontrado' };
            }
            return deletedDirector;
        } catch (error) {
            console.error(error);
            return { error: 'Error al eliminar el director' };
        }
    }
}

module.exports = DirectorService;
