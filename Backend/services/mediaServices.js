
const MediaModel = require('../models/MediaModel');
const GeneroModel = require('../models/GeneroModel');
const DirectorModel = require('../models/DirectorModel');
const ProductoraModel = require('../models/ProductoraModel');
const TipoModel = require('../models/TipoModel');

class Media {
    async createMedia(data) {
        try {
            const genero = await GeneroModel.findById(data.Genero);
            const director = await DirectorModel.findById(data.Director);
            const productora = await ProductoraModel.findById(data.Productora);
            const tipo = await TipoModel.findById(data.Tipo);

            if (!genero) {
                return { error: 'Género no encontrado' };
            }
            if (!director) {
                return { error: 'Director no encontrado' };
            }
            if (!productora) {
                return { error: 'Productora no encontrada' };
            }
            if (!tipo) {
                return { error: 'Tipo no encontrado' };
            }

            const newMedia = await MediaModel.create({
                ...data,
                Genero: genero._id,     
                Director: director._id,   
                Productora: productora._id,
                Tipo: tipo._id           
            });

            return newMedia;
        } catch (error) {
            console.log(error);
            return { error: 'Error al crear el documento Media' };
        }
    }

    async updateMedia(id, data) {
    try {
        // Buscar el documento Media actual
        const existingMedia = await MediaModel.findById(id);

        if (!existingMedia) {
            return { error: 'Documento Media no encontrado' };
        }

        const updateData = {};
        if (data.Titulo) updateData.Titulo = data.Titulo;
        if (data.Sinopsis) updateData.Sinopsis = data.Sinopsis;
        if (data.Url) updateData.Url = data.Url;
        if (data.Imagen) updateData.Imagen = data.Imagen;
        if (data.AnoEstreno) updateData.AnoEstreno = data.AnoEstreno;

        const updatedMedia = await MediaModel.findByIdAndUpdate(id, updateData, { new: true }).populate('Genero Director Productora Tipo');

        return updatedMedia;
    } catch (error) {
        console.log(error);
        return { error: 'Error al actualizar el documento Media' };
    }
}

    async getAllMedia() {
    try {
        const mediaList = await MediaModel.find().populate('Genero Director Productora Tipo');
        return mediaList;
    } catch (error) {
        console.log(error);
        return { error: 'Error al obtener la lista de medios' };
    }
}

    async getMediaById(id) {
    try {
        const media = await MediaModel.findById(id).populate('Genero Director Productora Tipo');
        return media;
    } catch (error) {
        console.log(error);
        return { error: 'Error al obtener el documento Media' };
    }
}

    async deleteMedia(id) {
    try {
        const deletedMedia = await MediaModel.findByIdAndDelete(id);
        return deletedMedia;
    } catch (error) {
        console.log(error);
        return { error: 'Error al eliminar el documento Media' };
    }
}
}

module.exports = Media;