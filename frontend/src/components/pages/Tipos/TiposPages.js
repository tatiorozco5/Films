import React, { useState, useEffect } from 'react';
import { getAllTipos, CreateTipo, UpdateTipo, deleteTipo } from '../../services/TipoServices';

const TiposPage = () => {
    const [TipoList, setTipoList] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [isUpdating, setIsUpdating] = useState(false); // Estado para saber si estamos creando o actualizando
    const [currentTipo, setCurrentTipo] = useState({ Nombre: '', Descripcion: '' }); // Tipo actual para crear/actualizar

    useEffect(() => {
        fetchTipo();
    }, []);

    const fetchTipo = async () => {
        try {
            const data = await getAllTipos();
            if (Array.isArray(data)) {
                setTipoList(data);
            } else {
                console.log("Se esperaba una matriz, pero se obtuvo:", data);
                setTipoList([]);
            }
        } catch (error) {
            console.error("Error al obtener los tipos:", error);
            setTipoList([]);
        }
    };

    // Función para abrir el modal en modo creación
    const handleOpenCreateModal = () => {
        setCurrentTipo({ Nombre: '', Descripcion: '' }); // Limpia el estado para crear un nuevo tipo
        setIsUpdating(false); // No estamos actualizando
        setShowModal(true); // Abre el modal
    };

    // Función para abrir el modal en modo actualización
    const handleOpenUpdateModal = (tipo) => {
        setCurrentTipo(tipo); // Carga el tipo actual en el estado
        setIsUpdating(true); // Estamos en modo actualización
        setShowModal(true); // Abre el modal
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Manejador para cambiar los campos de nombre y descripción
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTipo((prevTipo) => ({
            ...prevTipo,
            [name]: value
        }));
    };

    // Función para crear o actualizar el tipo según el estado
    const handleSaveTipo = async () => {
        if (isUpdating) {
            // Actualización
            try {
                await UpdateTipo(currentTipo._id, currentTipo);
                fetchTipo(); // Recargar la lista de tipos
                handleCloseModal(); // Cerrar el modal
            } catch (error) {
                console.error('Error al actualizar el tipo:', error);
            }
        } else {
            // Creación
            try {
                await CreateTipo(currentTipo);
                fetchTipo(); // Recargar la lista de tipos
                handleCloseModal(); // Cerrar el modal
            } catch (error) {
                console.error('Error al crear el tipo:', error);
            }
        }
    };

    const handleDeleteTipo = async (tipoid) => {
        const ConfirmDelete = window.confirm("Estas seguro que deseas eliminar este tipo")
        if (ConfirmDelete) {
            try {
                await deleteTipo(tipoid);
                fetchTipo()
            } catch (error) {
                console.error("Error al eliminar el tipo", error);
                
            }
        }
    }


    return (
        <div className="container mt-4">
            <h1>Tipos de Películas</h1>
            <button className="btn btn-primary m-2 btn-sm" onClick={handleOpenCreateModal}>
                Crear Nuevo Tipo
            </button>
            <div className="row">
                {TipoList.map((tipo) => (
                    <div className="col" key={tipo._id}>
                        <div className="card mb-3 border-0" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{tipo.Nombre}</h5>
                                <p className="card-text">{tipo.Descripcion}</p>
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm m-2"
                                    onClick={() => handleOpenUpdateModal(tipo)}
                                >
                                    Actualizar
                                </button>
                                <button type="button"  className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteTipo(tipo._id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para creación/actualización */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isUpdating ? 'Actualizar Tipo' : 'Crear Nuevo Tipo'}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={handleCloseModal}
                                >
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
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveTipo}
                                >
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
