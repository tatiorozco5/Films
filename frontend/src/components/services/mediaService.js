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