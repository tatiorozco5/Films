import URL_BASE from "../../config/config"

export const getAllMedia = async () => {
    try {
        const response = await fetch(`${URL_BASE}/media`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error al obtener las peliculas: ", error);
        return []
    }
}

export const getFormData = async () => {
    try {
        const [generosRes, directoresRes, productorasRes, tiposRes] = await Promise.all([
            fetch(`${URL_BASE}/genero`),
            fetch(`${URL_BASE}/director`),
            fetch(`${URL_BASE}/productora`),
            fetch(`${URL_BASE}/tipos`),
        ]);

        const generos = await generosRes.json();
        const directores = await directoresRes.json();
        const productoras = await productorasRes.json();
        const tipos = await tiposRes.json();

        return {
            generos,
            directores,
            productoras,
            tipos
        };
    } catch (error) {
        console.error('Error fetching form data:', error);
        return null;
    }
};


export const createMedia = async (newMedia) => {
    try {

        const { Serial, ...mediaWithoutSerial } = newMedia;

        const response = await fetch(`${URL_BASE}/media/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mediaWithoutSerial),
        })


        if (!response.ok) {
            const errorMessage = await response.json();
            console.error('Error desde el servidor:', errorMessage);
            throw new Error(errorMessage.message || 'Error al crear la media');
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al crear la media:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const deleteMedia = async (mediaId) => {
    try {
                
        const response = await fetch(`${URL_BASE}/media/${mediaId}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            const errorMessage = await response.json()

            console.error('Error desde el servidor al eliminar:', errorMessage);
            throw new Error(errorMessage.message || 'Error al eliminar la media');
        }

        return true
        
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        throw new Error('Hubo un error al eliminar la película.');
    }
}