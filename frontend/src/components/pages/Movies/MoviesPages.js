import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { deleteMedia, getAllMedia } from '../../services/mediaService';
import CreateMediaPage from './CreateMediaPage';

const MoviesPage = () => {
    const [mediaList, setMediaList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const data = await getAllMedia();
            if (data && Array.isArray(data)) {
                setMediaList(data);
            } else {
                console.error('Los datos obtenidos no son válidos:', data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de medios:', error);
        }
    };

    const handleEdit = (media) => {
        setSelectedMedia(media);
        setShowModal(true);
    };

    const handleUpdate = async (updateMedia) => {
        try {
            await updateMedia(selectedMedia._id, updateMedia);
            fetchMedia();
            setShowModal(false);
        } catch (error) {
            console.error('Error al actualizar la media', error);
        }
    };

    const handleDelete = async (mediaId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta película?")) {
            try {
                await deleteMedia(mediaId);
                fetchMedia();
            } catch (error) {
                console.error('Error al eliminar el medio:', error);
            }
        }
    };

    const formatearFecha = (fecha) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Bogota',
        }).format(new Date(fecha));
    };

    // Configuración del carrusel con autoplay y pausa al pasar el mouse
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3, // Muestra 3 películas al mismo tiempo
        slidesToScroll: 1,
        autoplay: true,  // Autoplay activado
        autoplaySpeed: 2000,  // Velocidad de cambio
        pauseOnHover: true,  // Pausa al pasar el mouse
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Lista de Películas</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedMedia(null);
                        setShowModal(true);
                    }}
                >
                    Crear Nueva Película
                </button>
            </div>

            {/* Contenedor del Slider */}
            <div className="slider-container">
                <Slider {...settings}>
                    {mediaList.map((media) => (
                        <div key={media._id} className="col-12">
                            <div className="card border-0" style={{ width: '18rem', margin: '0 auto' }}>
                                <img
                                    src={media.Imagen}
                                    className="card-img-top"
                                    alt={media.Titulo}
                                    style={{ height: '400px', objectFit: 'cover' }} // Asegúrate de que la imagen no distorsione
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">Titulo {media.Titulo}</h5>
                                    <p className="card-text">
                                        Género {media.Genero?.Nombre ?? 'Género no disponible'}
                                    </p>
                                    <p className="card-text">Año de estreno {media.AnoEstreno}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <small className="text-body-secondary">
                                        {media.createdAt ? formatearFecha(media.createdAt) : 'Fecha no disponible'}
                                    </small>
                                </div>
                                <div className="card-footer text-center">
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm m-2"
                                        onClick={() => handleEdit(media)}
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm m-2"
                                        onClick={() => handleDelete(media._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {showModal && (
                <CreateMediaPage
                    onClose={() => setShowModal(false)}
                    selectedMedia={selectedMedia}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default MoviesPage;
