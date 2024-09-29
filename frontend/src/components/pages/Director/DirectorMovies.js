import React, { useEffect, useState } from 'react'
import { getAllDirector, CreateDirector, UpdateDirector, deleteDirector } from '../../services/DirectorService'


const DirectorMovies = () => {
    const [directorList, setDirectorList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentDirector, setCurrentDirector] = useState({ Nombre_Director: '', Estado: '', });

    useEffect(() => {
        fetchDirector()
    }, [])

    const fetchDirector = async () => {
        try {
            const data = await getAllDirector();
            if (data && Array.isArray(data)) {
                setDirectorList(data);
            } else {
                console.error('Los datos obtenidos no son válidos:', data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de medios:', error);
        }
    }

    const handleOpenCreateModal = () => {
        setCurrentDirector({ Nombre_Director: '', Estado: '' })
        setShowModal(true)
    }

    const handleOpenUpdateModal = (director) => {
        setCurrentDirector(director); 
        setIsUpdating(true); 
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentDirector((prevDirector) => ({
            ...prevDirector,
            [name]: value
        }));
    };

    const handleSaveDirector = async () => {
        if (isUpdating) {
            // Actualización
            try {
                await UpdateDirector(currentDirector._id, currentDirector);
                fetchDirector(); // Recargar la lista de tipos
                handleCloseModal(); // Cerrar el modal
            } catch (error) {
                console.error('Error al actualizar el director:', error);
            }
        } else {
            // Creación
            try {
                await CreateDirector(currentDirector);
                fetchDirector(); // Recargar la lista de tipos
                handleCloseModal(); // Cerrar el modal
            } catch (error) {
                console.error('Error al crear el director:', error);
            }
        }
    };

    const handleDeleteDirector = async (tipoid) => {
        const ConfirmDelete = window.confirm("Estas seguro que deseas eliminar este tipo")
        if (ConfirmDelete) {
            try {
                await deleteDirector(tipoid);
                fetchDirector()
            } catch (error) {
                console.error("Error al eliminar el tipo", error);

            }
        }
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Director</h1>
            <button className="btn btn-primary m-2" onClick={handleOpenCreateModal}>
                Crear Nuevo Director
            </button>

            <div className="row">
                {directorList.map((director) => (
                    <div className="col">
                        <div key={director._id} className="card mb-3 border-0 " style={{ width: '18rem' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title"> {director.Nombre_Director}</h5>
                                <p className="card-text"> {director.Estado}</p>
                            </div>

                            <div className="card-footer text-center">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm m-2"
                                    onClick={() => handleOpenUpdateModal(director)}
                                >

                                    Actualizar
                                </button>
                                <button type="button" className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteDirector(director._id)}>
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
                                    {isUpdating ? 'Actualizar Director' : 'Crear Nuevo Director'}
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
                                    onClick={handleSaveDirector}
                                >
                                    {isUpdating ? 'Guardar Cambios' : 'Crear'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )} </div>

    );
}


export default DirectorMovies;