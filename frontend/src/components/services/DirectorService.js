import URL_BASE from "../../config/config"


export const getAllDirector = async () => {
    try {
        const response = await fetch(`${URL_BASE}/director`)
        const data = await response.json()
        console.log(data);

        return data
    } catch (error) {
        console.error("Error al obtener las peliculas: ", error);
        return []
    }
}