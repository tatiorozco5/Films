const DirectorModel = require("../models/DirectorModel")

class Director{
    async getallDirector(){
        try {
            const directores = await DirectorModel.find()
            return directores
        } catch (error) {
            console.log(error);
            return error
            
        }
    }
    async createDirector(data){
        try {
            console.log(data);
            const newdirector = await DirectorModel.create(data)
            return newdirector
        } catch (error) {
            console.log(error);
            return error        
        }
    }
    async getDirectorbyId(id){
        try {
            const directorid = await DirectorModel.findById(id)
            return directorid
        } catch (error) {
            console.log(error);
            return error 
        }
    }
    async updateDirector(id, data){
        try {
            const updatedirector = await DirectorModel.findByIdAndUpdate(id, data,{new:true})
            return updatedirector
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async deleteDirector(id){
        try {
            const deletedirector = await DirectorModel.findByIdAndDelete(id)
            return deletedirector
        } catch (error) {
            console.log(error);
            return error 
        }
    }
      
}

module.exports = Director