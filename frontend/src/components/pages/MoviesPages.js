import React, { useEffect, useState } from 'react'
import { getAllMedia } from '../services/mediaService'

const MoviesPage = () => {
    const [mediaList, setMediaList] = useState({})

    useEffect(() => {
        fetchMedia()
    }, [])
    
    const fetchMedia = async () => {
        // try{
        // const data = await getAllMedia()
        // console.log(data);
        // if (Array.isArray(data)) {
        //     setMediaList(data)
        // } else {
        //     console.log("Se esperaba una matriz, pero se obtuvo:",data);
        //     setMediaList([])
        // }
        //  }catch(error){
        //     console.error("Error al obtener la media:",error)
        //     setMediaList([])
            
        //  }
        try {
            const result = await getAllMedia();
            console.log(result); // Verifica aquí la respuesta
            // Verifica si result es un array
            if (Array.isArray(result)) {
                setMediaList(result);
            } else if (result.error) {
                console.error("Error from backend:", result.error);
                setMediaList([]); // Resetea a un array vacío en caso de error
            } else {
                console.error("Unexpected response:", result);
                setMediaList([]);
            }
        } catch (error) {
            console.error("Error fetching media:", error);
            setMediaList([]); // Resetea a un array vacío en caso de error
        }
        
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Películas</h1>
            <ul className="list-group mt-4">
                {mediaList.map((media) => (
                    <li key={media._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {media.title} - {media.genre}
                       
                    </li>
                ))}
            </ul>
        </div>
    );
    
}


export default MoviesPage