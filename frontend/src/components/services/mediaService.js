import URL_BASE from "../../config/config"

export const getAllMedia = async () => {
    try {
        const response = await fetch(`${URL_BASE}/media`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error al obtener las peliculas: ",error);
        return[]
    }
}

export const createMedia = async (media) => {
    try {
        const response = await fetch(`${URL_BASE}/media/create`,{
            method:'POST',
            //headers:{'Content-Type':'aplication/json'},
            body:JSON.stringify(media)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error al crear la pelicula:",error);
        return[]        
    }
}