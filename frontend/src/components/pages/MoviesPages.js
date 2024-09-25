import React, { useEffect, useState } from 'react'
import { getAllMedia, createMedia } from '../services/mediaService'

const MoviesPage = ({media}) => {
    const [mediaList, setMediaList] = useState([])
    const [newMedia, setNewMedia] = useState({
        Serial: '',
        Titulo: '',
        Sinopsis: '',
        Url: '',
        Imagen: '',
        AnoEstreno: '',
        Genero: '',
        Director: '',
        Productora: '',
        Tipo: ''
    })

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchMedia()
    }, [])

    const handleCreateMedia = async () =>{
        await createMedia(newMedia)
        fetchMedia()
        setShowModal(false)
        setNewMedia({
            Serial: '',
            Titulo: '',
            Sinopsis: '',
            Url: '',
            Imagen: '',
            AnoEstreno: '',
            Genero: '',
            Director: '',
            Productora: '',
            Tipo: ''
        })
    }

    const handleInputChange = (e)=>{
        const {name, value} = e.target
        setNewMedia({...newMedia,[name]:value})
    }

    const fetchMedia = async () => {
        try {
            const data = await getAllMedia()
            console.log(data);
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
            timeZone: 'UTC' // Asegura que se formatee en UTC, ajusta según necesidad
        }).format(new Date(fecha));
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Películas</h1>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Crear Nueva Película
            </button>
            
            {mediaList.map((media) => (
                <>
                    <div className="card mb-3 border-0 w-100" style={{ maxwidth: '440px' }}>
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


                </>
            ))}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Nueva Película</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {/* Campos del formulario */}
                                <div className="mb-3">
                                    <label htmlFor="Serial" className="form-label">Serial</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Serial"
                                        name="Serial"
                                        value={newMedia.Serial}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Titulo" className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Titulo"
                                        name="Titulo"
                                        value={newMedia.Titulo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Sinopsis" className="form-label">Sinopsis</label>
                                    <textarea
                                        className="form-control"
                                        id="Sinopsis"
                                        name="Sinopsis"
                                        value={newMedia.Sinopsis}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Url" className="form-label">Url</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Url"
                                        name="Url"
                                        value={newMedia.Url}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Imagen" className="form-label">Imagen</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Imagen"
                                        name="Imagen"
                                        value={newMedia.Imagen}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="AnoEstreno" className="form-label">Año de Estreno</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="AnoEstreno"
                                        name="AnoEstreno"
                                        value={newMedia.AnoEstreno}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* Relaciones */}
                                <div className="mb-3">
                                    <label htmlFor="Genero" className="form-label">Género</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Genero"
                                        name="Genero"
                                        value={newMedia.Genero}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Director" className="form-label">Director</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Director"
                                        name="Director"
                                        value={newMedia.Director}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Productora" className="form-label">Productora</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Productora"
                                        name="Productora"
                                        value={newMedia.Productora}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Tipo" className="form-label">Tipo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Tipo"
                                        name="Tipo"
                                        value={newMedia.Tipo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateMedia}>
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        
       </div>

);
}

export default MoviesPage