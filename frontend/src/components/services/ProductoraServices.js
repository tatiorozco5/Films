import URL_BASE from "../../config/config"


export const getAllProductora = async () => {
    try {
        const response = await fetch(`${URL_BASE}/productora`)
        const data = await response.json()
        console.log(data);

        return data
    } catch (error) {
        console.error("Error al obtener el productora: ", error);
        return []
    }
}

export const CreateProductora = async (newProductora) => {
    try {
        const response = await fetch(`${URL_BASE}/productora/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProductora)
        })

        if (!response.ok) {
            const MessageError = await response.json()
            console.log("Error al obtener el productora: ", MessageError);
            throw new Error(MessageError.error)

        }

        const data = await response.json()
        return data;
        
    } catch (error) {
        console.error('Error al crear el productora:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const UpdateProductora = async (id, updatedProductora) => {
    try {
        const response = await fetch(`${URL_BASE}/productora/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProductora)
        });

        if (!response.ok) {
            const MessageError = await response.json();
            console.error("Error al actualizar productora:", MessageError);
            throw new Error(MessageError.error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar productora:', error.message);
        throw error;
    }
};


export const deleteProductora = async (ProductoraId) => {
    try {
        const response = await fetch(`${URL_BASE}/productora/${ProductoraId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.log("Error: " + errorMessage);

            throw new Error(errorMessage.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el productora:', error.message);
        throw error;
    }
};