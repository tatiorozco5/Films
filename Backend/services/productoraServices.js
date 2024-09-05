const ProductoraModel = require('../models/ProductoraModel');

class Productora {
    async getAllProductoras() {
        try {
            const productoras = await ProductoraModel.find();
            return productoras;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async createProductora(data) {
        try {
            const newProductora = await ProductoraModel.create(data);
            return newProductora;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getProductoraById(id) {
        try {
            const productora = await ProductoraModel.findById(id);
            return productora;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async updateProductora(id, data) {
        try {
            const updatedProductora = await ProductoraModel.findByIdAndUpdate(id, data, { new: true });
            return updatedProductora;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteProductora(id) {
        try {
            const deletedProductora = await ProductoraModel.findByIdAndDelete(id);
            return deletedProductora;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = Productora;