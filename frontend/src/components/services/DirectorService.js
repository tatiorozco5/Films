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

export const CreateDirector = async (newDirector) => {
    try {
        const response = await fetch(`${URL_BASE}/director/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDirector)
        })

        if (!response.ok) {
            const MessageError = await response.json()
            console.log("Error al obtener los directores: ", MessageError);
            throw new Error(MessageError.error)

        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al crear el director:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const UpdateDirector = async (id, updatedDirector) => {
    try {
        const response = await fetch(`${URL_BASE}/director/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDirector)
        });

        if (!response.ok) {
            const MessageError = await response.json();
            console.error("Error al actualizar director:", MessageError);
            throw new Error(MessageError.error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar director:', error.message);
        throw error;
    }
};


export const deleteDirector = async (DirectorId) => {
    try {
        const response = await fetch(`${URL_BASE}/tipos/${DirectorId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.log("Error: " + errorMessage);

            throw new Error(errorMessage.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el director:', error.message);
        throw error;
    }
};