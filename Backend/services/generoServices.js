const GeneroModel = require("../models/GeneroModel")

class Genero{
    async getallGeneros(){
        try {
            const generos = await GeneroModel.find()
            return generos
        } catch (error) {
            console.log(error);
            return error
            
        }
    }
    async createGenero(data){
        try {
            console.log(data);
            const newgenero = await GeneroModel.create(data)
            return newgenero
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async getGenerobyId(id){
        try {
            const generoid = await GeneroModel.findById(id)
            return generoid
        } catch (error) {
            console.log(error);
            return error 
        }
    }
    async updateGenero(id, data){
        try {
            const updategenero = await GeneroModel.findByIdAndUpdate(id, data,{new:true})
            return updategenero
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async deleteGenero(id){
        try {
            const deletegenero = await GeneroModel.findByIdAndDelete(id)
            return deletegenero
        } catch (error) {
            console.log(error);
            return error 
        }
    }
}

module.exports = Genero