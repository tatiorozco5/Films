import React, { useEffect, useState } from 'react'
import { deleteMedia, getAllMedia } from '../../services/mediaService'
import CreateMediaPage from './CreateMediaPage';

const MoviesPage = ({ media }) => {
    const [mediaList, setMediaList] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchMedia()
    }, [])

    const fetchMedia = async () => {
        try {
            const data = await getAllMedia()
            if (Array.isArray(data)) {
                setMediaList(data)
            } else {
                console.log("Se esperaba una matriz, pero se obtuvo:", data);
                setMediaList([])
            }
        } catch (error) {
            console.error("Error al obtener la media:", error)
            setMediaList([])
        }
    }

    const handleDelete = async (mediaId) => {
        if (window.confirm("¿Estas seguro que deseas eliminar esta pelicula?")) {
            try {
                await deleteMedia(mediaId)
                                
                alert('Pelicula eliminada exitosamente')
                fetchMedia()

            } catch (error) {
                console.error(error.message)
            }
        }
    }

    const formatearFecha = (fecha) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Bogota'
        }).format(new Date(fecha));
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Películas</h1>
            <button className="btn btn-primary m-2" onClick={() => setShowModal(true)}>
                Crear Nueva Película
            </button>
            
            <div className="row">
                {mediaList.map((media) => (
                    <div className="col">
                        <div key={media._id} className="card mb-3 border-0 " style={{ width: '18rem' }}>
                            <img src={media.Imagen} className="card-img-top" alt={media.Titulo} style={{ width: '288px', height: '432px' }} />
                            <div className="card-body text-center">
                                <h5 className="card-title">Titulo {media.Titulo}</h5>
                                <p className="card-text">Genero {media.Genero.Nombre}</p>
                                <p className="card-text">Año de estreno  {media.AnoEstreno}</p>
                            
                            </div>
                            <div className="card-footer text-center">
                                <small className="text-body-secondary">
                                    {media.createdAt ? formatearFecha(media.createdAt) : 'Fecha no disponible'}
                                </small>
                            </div>
                            <div className="card-footer text-center">
                            <button type="button" className="btn btn-success btn-sm m-2">Actualizar</button>
                            <button type="button" className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(media._id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
                {showModal && <CreateMediaPage onClose={() => setShowModal(false)} />}
            </div>  </div>

    );
}

export default MoviesPage