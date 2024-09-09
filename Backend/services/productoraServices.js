const ProductoraModel = require('../models/ProductoraModel');

class ProductoraService {
    async createProductora(data) {
        try {
            const newProductora = await ProductoraModel.create(data);
            return newProductora;
        } catch (error) {
            console.error(error);
            return { error: 'Error al crear la productora' };
        }
    }

    async getAllProductoras() {
        try {
            const productoras = await ProductoraModel.find();
            return productoras;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener la lista de productoras' };
        }
    }

    async getProductoraById(id) {
        try {
            const productora = await ProductoraModel.findById(id);
            if (!productora) {
                return { error: 'Productora no encontrada' };
            }
            return productora;
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener la productora' };
        }
    }

    async updateProductora(id, data) {
        try {
            const updatedProductora = await ProductoraModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedProductora) {
                return { error: 'Productora no encontrada' };
            }
            return updatedProductora;
        } catch (error) {
            console.error(error);
            return { error: 'Error al actualizar la productora' };
        }
    }

    async deleteProductora(id) {
        try {
            const deletedProductora = await ProductoraModel.findByIdAndDelete(id);
            if (!deletedProductora) {
                return { error: 'Productora no encontrada' };
            }
            return deletedProductora;
        } catch (error) {
            console.error(error);
            return { error: 'Error al eliminar la productora' };
        }
    }
}

module.exports = ProductoraService;
