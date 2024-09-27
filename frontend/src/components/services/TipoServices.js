import URL_BASE from "../../config/config"


export const getAllTipos = async () => {
    try {
        const response = await fetch(`${URL_BASE}/tipos`)
        const data = await response.json()
        console.log(data);

        return data
    } catch (error) {
        console.error("Error al obtener las peliculas: ", error);
        return []
    }
}



export const CreateTipo = async (newTipo) => {
    try {
        const response = await fetch(`${URL_BASE}/tipos/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTipo)
        })

        if (!response.ok) {
            const MessageError = await response.json()
            console.log("Error al obtener los tipos: ", MessageError);
            throw new Error(MessageError.error)

        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al crear el tipo:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const UpdateTipo = async (id, updatedTipo) => {
    try {
        const response = await fetch(`${URL_BASE}/tipos/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTipo)
        });

        if (!response.ok) {
            const MessageError = await response.json();
            console.error("Error al actualizar el tipo:", MessageError);
            throw new Error(MessageError.error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el tipo:', error.message);
        throw error;
    }
};


export const deleteTipo = async (tipoId) => {
    try {
        const response = await fetch(`${URL_BASE}/tipos/${tipoId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.log("Error: " + errorMessage);

            throw new Error(errorMessage.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el tipo:', error.message);
        throw error;
    }
};
