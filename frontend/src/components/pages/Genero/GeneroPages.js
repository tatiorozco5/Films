import React, { useEffect, useState } from 'react';
import { getAllGenero, CreateGenero, UpdateGenero, deleteGenero } from '../../services/GeneroService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const GeneroPages = () => {
    const [generoList, setGeneroList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentGenero, setCurrentGenero] = useState({ Nombre: '', Estado: '', Descripcion: '' });

    useEffect(() => {
        fetchGenero();
    }, []);

    const fetchGenero = async () => {
        try {
            const data = await getAllGenero();
            if (data && Array.isArray(data)) {
                setGeneroList(data);
            } else {
                Swal.fire('Error', 'Datos inválidos obtenidos del servidor', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al obtener la lista de géneros', 'error');
        }
    };

    const handleOpenCreateModal = () => {
        setCurrentGenero({ Nombre: '', Estado: '', Descripcion: '' });
        setIsUpdating(false);
        setShowModal(true);
    };

    const handleOpenUpdateModal = (genero) => {
        setCurrentGenero(genero);
        setIsUpdating(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentGenero((prevGenero) => ({
            ...prevGenero,
            [name]: value
        }));
    };

    const handleSaveGenero = async () => {
        try {
            if (isUpdating) {
                await UpdateGenero(currentGenero._id, currentGenero);
                Swal.fire('Actualizado', 'El género ha sido actualizado con éxito', 'success');
            } else {
                await CreateGenero(currentGenero);
                Swal.fire('Creado', 'El género ha sido creado con éxito', 'success');
            }
            fetchGenero(); // Recargar la lista
            handleCloseModal(); // Cerrar el modal
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al guardar el género', 'error');
        }
    };

    const handleDeleteGenero = async (generoId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteGenero(generoId);
                Swal.fire('Eliminado', 'El género ha sido eliminado con éxito', 'success');
                fetchGenero();
            } catch (error) {
                Swal.fire('Error', 'Ocurrió un error al eliminar el género', 'error');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Lista de Géneros</h1>
                <button className="btn btn-primary" onClick={handleOpenCreateModal}>
                    Crear Nuevo Género
                </button>
            </div>

            <div className="row g-4">
                {generoList.map((genero) => (
                    <div key={genero._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center d-flex flex-column justify-content-between">
                                <h5 className="card-title">{genero.Nombre}</h5>
                                <p className="card-text"><strong>Estado: </strong>{genero.Estado}</p>
                                <p className="card-text">{genero.Descripcion}</p>
                            </div>
                            <div className="card-footer text-center bg-light border-0">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm m-1"
                                    onClick={() => handleOpenUpdateModal(genero)}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Actualizar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm m-1"
                                    onClick={() => handleDeleteGenero(genero._id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">{isUpdating ? 'Actualizar Género' : 'Crear Nuevo Género'}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        name="Nombre"
                                        value={currentGenero.Nombre}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Ingresa el nombre del género"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select
                                        name="Estado"
                                        value={currentGenero.Estado}
                                        onChange={handleInputChange}
                                        className="form-select"
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        name="Descripcion"
                                        value={currentGenero.Descripcion}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows="3"
                                        placeholder="Describe el género"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveGenero}>
                                    {isUpdating ? 'Guardar Cambios' : 'Crear'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneroPages;
