import React, { useEffect, useState } from 'react';
import { getAllDirector, CreateDirector, UpdateDirector, deleteDirector } from '../../services/DirectorService';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const DirectorMovies = () => {
    const [directorList, setDirectorList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentDirector, setCurrentDirector] = useState({ Nombre_Director: '', Estado: '' });

    useEffect(() => {
        fetchDirector();
    }, []);

    const fetchDirector = async () => {
        try {
            const data = await getAllDirector();
            if (data && Array.isArray(data)) {
                setDirectorList(data);
            } else {
                console.error('Los datos obtenidos no son válidos:', data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de directores:', error);
        }
    };

    const handleOpenCreateModal = () => {
        setCurrentDirector({ Nombre_Director: '', Estado: '' });
        setIsUpdating(false);
        setShowModal(true);
    };

    const handleOpenUpdateModal = (director) => {
        setCurrentDirector(director);
        setIsUpdating(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentDirector((prevDirector) => ({
            ...prevDirector,
            [name]: value
        }));
    };

    const handleSaveDirector = async () => {
        try {
            if (isUpdating) {
                await UpdateDirector(currentDirector._id, currentDirector);
                Swal.fire({
                    title: 'Actualizado',
                    text: 'El director ha sido actualizado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
            } else {
                await CreateDirector(currentDirector);
                Swal.fire({
                    title: 'Creado',
                    text: 'El director ha sido creado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
            }
            fetchDirector(); // Recargar la lista de directores
            handleCloseModal(); // Cerrar el modal
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al guardar el director',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };

    const handleDeleteDirector = async (directorId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await deleteDirector(directorId);
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El director ha sido eliminado',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                fetchDirector();
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al eliminar el director',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Lista de Directores</h1>
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-primary" onClick={handleOpenCreateModal}>
                    <FontAwesomeIcon icon={faPlus} /> Crear Nuevo Director
                </button>
            </div>

            <div className="row">
                {directorList.map((director) => (
                    <div className="col-md-4" key={director._id}>
                        <div className="card mb-3 border-0 shadow-lg" style={{ width: '18rem' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title">{director.Nombre_Director}</h5>
                                <p className={`card-text ${director.Estado === 'Activo' ? 'text-success' : 'text-danger'}`}>
                                    {director.Estado}
                                </p>
                            </div>

                            <div className="card-footer d-flex justify-content-around">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleOpenUpdateModal(director)}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Actualizar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteDirector(director._id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isUpdating ? 'Actualizar Director' : 'Crear Nuevo Director'}
                                </h5>
                            
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="Nombre_Director"
                                        value={currentDirector.Nombre_Director}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        name="Estado"
                                        value={currentDirector.Estado}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveDirector}>
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

export default DirectorMovies;
