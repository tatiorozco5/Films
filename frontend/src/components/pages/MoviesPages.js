import React, { useEffect, useState } from 'react'
import { getAllMedia } from '../services/mediaService'
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

            {mediaList.map((media) => (

                <div key={media.id} className="card mb-3 border-0 w-100" style={{ maxwidth: '440px' }}>

                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={media.Imagen} className="img-fluid rounded-start w-100" alt={media.Titulo} />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">{media.Titulo}</h5>
                                <p className="card-text">{media.Sinopsis}</p>
                                <p className="card-text"><small className="text-body-secondary">
                                    {media.createdAt ? formatearFecha(media.createdAt) : 'Fecha no disponible'}
                                </small></p>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
            {showModal && <CreateMediaPage onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default MoviesPage