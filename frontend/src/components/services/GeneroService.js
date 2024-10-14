import URL_BASE from "../../config/config"


export const getAllGenero = async () => {
    try {
        const response = await fetch(`${URL_BASE}/genero`)
        const data = await response.json()
        console.log(data);

        return data
    } catch (error) {
        console.error("Error al obtener el genero: ", error);
        return []
    }
}

export const CreateGenero = async (newGenero) => {
    try {
        const response = await fetch(`${URL_BASE}/genero/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGenero)
        })

        if (!response.ok) {
            const MessageError = await response.json()
            console.log("Error al obtener el genero: ", MessageError);
            throw new Error(MessageError.error)

        }

        const data = await response.json()
        return data;
        
    } catch (error) {
        console.error('Error al crear el genero:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const UpdateGenero = async (id, updatedGenero) => {
    try {
        const response = await fetch(`${URL_BASE}/genero/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGenero)
        });

        if (!response.ok) {
            const MessageError = await response.json();
            console.error("Error al actualizar genero:", MessageError);
            throw new Error(MessageError.error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar genero:', error.message);
        throw error;
    }
};


export const deleteGenero = async (GeneroId) => {
    try {
        const response = await fetch(`${URL_BASE}/genero/${GeneroId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.log("Error: " + errorMessage);

            throw new Error(errorMessage.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el genero:', error.message);
        throw error;
    }
};