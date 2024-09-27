import React, { useEffect, useState } from 'react';
import { getFormData, createMedia } from '../../services/mediaService';

const CreateMediaPage = ({ onClose }) => {
    const [formData, setFormData] = useState({
        generos: [],
        directores: [],
        productoras: [],
        tipos: []
    });

    const [newMedia, setNewMedia] = useState({
        Titulo: '',
        Sinopsis: '',
        Url: '',
        Imagen: '',
        AnoEstreno: '',
        Genero: '',
        Director: '',
        Productora: '',
        Tipo: ''
    });

    // Cargar los datos de los select al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            const data = await getFormData();
            if (data) {
                setFormData(data);

            }
        };

        fetchData();
    }, []);

    // Manejar los cambios en los inputs
    const handleInputChange = (e) => {
        setNewMedia({
            ...newMedia,
            [e.target.name]: e.target.value
        });
    };


    const handleCreateMedia = async () => {
        try {
            const result = await createMedia(newMedia);
            alert('Película creada exitosamente!');
            setNewMedia({
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
            onClose()
        } catch (error) {
            console.error('Error al crear la película:', error);
            alert('Hubo un error al crear la película. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Nueva Película</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="Titulo" className="form-label">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Titulo"
                                name="Titulo"
                                value={newMedia.Titulo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Sinopsis" className="form-label">Sinopsis</label>
                            <textarea
                                className="form-control"
                                id="Sinopsis"
                                name="Sinopsis"
                                rows="3"
                                value={newMedia.Sinopsis}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Url" className="form-label">URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Url"
                                name="Url"
                                value={newMedia.Url}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Imagen" className="form-label">Imagen (URL)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Imagen"
                                name="Imagen"
                                value={newMedia.Imagen}
                                onChange={handleInputChange}
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
                            />
                        </div>

                        {/* Selects para los campos relacionados */}
                        <div className="mb-3">
                            <label htmlFor="Genero" className="form-label">Género</label>
                            <select
                                className="form-select"
                                id="Genero"
                                name="Genero"
                                value={newMedia.Genero}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona un género</option>
                                {formData.generos.map((genero) => (
                                    <option key={genero._id} value={genero._id}>
                                        {genero.Nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Director" className="form-label">Director</label>
                            <select
                                className="form-select"
                                id="Director"
                                name="Director"
                                value={newMedia.Director}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona un director</option>
                                {formData.directores.map((director) => (
                                    <option key={director._id} value={director._id}>
                                        {director.Nombre_Director}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Productora" className="form-label">Productora</label>
                            <select
                                className="form-select"
                                id="Productora"
                                name="Productora"
                                value={newMedia.Productora}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona una productora</option>
                                {formData.productoras.map((productora) => (
                                    <option key={productora._id} value={productora._id}>
                                        {productora.Nombre_Productora}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Tipo" className="form-label">Tipo</label>
                            <select
                                className="form-select"
                                id="Tipo"
                                name="Tipo"
                                value={newMedia.Tipo}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona un tipo</option>
                                {formData.tipos.map((tipo) => (
                                    <option key={tipo._id} value={tipo._id}>
                                        {tipo.Nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleCreateMedia}>
                            Crear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMediaPage;
