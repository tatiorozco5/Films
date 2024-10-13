import React, { useState, useEffect } from 'react';
import { getAllTipos, CreateTipo, UpdateTipo, deleteTipo } from '../../services/TipoServices';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TiposPage = () => {
    const [TipoList, setTipoList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTipo, setCurrentTipo] = useState({ Nombre: '', Descripcion: '' });

    useEffect(() => {
        fetchTipo();
    }, []);

    const fetchTipo = async () => {
        try {
            const data = await getAllTipos();
            if (Array.isArray(data)) {
                setTipoList(data);
            } else {
                console.error('Error al obtener los tipos:', data);
                setTipoList([]);
            }
        } catch (error) {
            console.error('Error al obtener los tipos:', error);
        }
    };

    const handleOpenCreateModal = () => {
        setCurrentTipo({ Nombre: '', Descripcion: '' });
        setIsUpdating(false);
        setShowModal(true);
    };

    const handleOpenUpdateModal = (tipo) => {
        setCurrentTipo(tipo);
        setIsUpdating(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTipo((prevTipo) => ({
            ...prevTipo,
            [name]: value
        }));
    };

    const handleSaveTipo = async () => {
        try {
            if (isUpdating) {
                await UpdateTipo(currentTipo._id, currentTipo);
                Swal.fire('Actualizado', 'El tipo ha sido actualizado con éxito', 'success');
            } else {
                await CreateTipo(currentTipo);
                Swal.fire('Creado', 'El tipo ha sido creado con éxito', 'success');
            }
            fetchTipo();
            handleCloseModal();
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al guardar el tipo', 'error');
        }
    };

    const handleDeleteTipo = async (tipoId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteTipo(tipoId);
                Swal.fire('Eliminado', 'El tipo ha sido eliminado', 'success');
                fetchTipo();
            } catch (error) {
                Swal.fire('Error', 'Ocurrió un error al eliminar el tipo', 'error');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>Tipos de Películas</h1>
            <button className="btn btn-primary m-2" onClick={handleOpenCreateModal}>
                Crear Nuevo Tipo
            </button>

            <div className="row">
                {TipoList.map((tipo) => (
                    <div className="col" key={tipo._id}>
                        <div className="card mb-3 border-0 shadow-sm" style={{ width: '18rem' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title">{tipo.Nombre}</h5>
                                <p className="card-text">{tipo.Descripcion}</p>
                            </div>

                            <div className="card-footer text-center">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm m-2"
                                    onClick={() => handleOpenUpdateModal(tipo)}
                                >
                                       <FontAwesomeIcon icon={faEdit} /> Actualizar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm m-2"
                                    onClick={() => handleDeleteTipo(tipo._id)}
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
                                <h5 className="modal-title">{isUpdating ? 'Actualizar Tipo' : 'Crear Nuevo Tipo'}</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="Nombre"
                                        value={currentTipo.Nombre}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        name="Descripcion"
                                        value={currentTipo.Descripcion}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveTipo}>
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

export default TiposPage;