import React, { useEffect, useState } from 'react'
import { getAllGenero, CreateGenero, UpdateGenero, deleteGenero } from '../../services/GeneroService'


const GeneroPages = () => {
    const [generoList, setGeneroList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentGenero, setCurrentGenero] = useState({ Nombre: '', Estado: '', Descripcion: '', });

    useEffect(() => {
        fetchGenero()
    }, [])

    const fetchGenero = async () => {
        try {
            const data = await getAllGenero();
            if (data && Array.isArray(data)) {
                setGeneroList(data);
            } else {
                console.error('Los datos obtenidos no son válidos:', data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de medios:', error);
        }
    }

    const handleOpenCreateModal = () => {
        setCurrentGenero({ Nombre: '', Estado: '', Descripcion: '' }); 
        setIsUpdating(false); 
        setShowModal(true);
    }

    const handleOpenUpdateModal = (genero) => {
        setCurrentGenero(genero); 
        setIsUpdating(true); 
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentGenero((prevGenero) => ({
            ...prevGenero,
            [name]: value
        }));
    };

    const handleSaveGenero = async () => {
    if (isUpdating) {
        try {
            await UpdateGenero(currentGenero._id, currentGenero);
            fetchGenero(); // Recargar la lista de generos
            handleCloseModal(); // Cerrar el modal
        } catch (error) {
            console.error('Error al actualizar el genero:', error);
        }
    } else {
        try {
            // Verifica los datos antes de enviarlos
            console.log('Datos a enviar:', currentGenero);

            await CreateGenero(currentGenero); // Aquí haces la creación
            fetchGenero(); // Recargar la lista de generos
            handleCloseModal(); // Cerrar el modal
        } catch (error) {
            console.error('Error al crear el genero:', error);
        }
    }
};

    const handleDeleteGenero = async (generoid) => {
        const ConfirmDelete = window.confirm("Estas seguro que deseas eliminar este genero")
        if (ConfirmDelete) {
            try {
                await deleteGenero(generoid);
                fetchGenero()
            } catch (error) {
                console.error("Error al eliminar el genero", error);

            }
        }
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Genero</h1>
            <button className="btn btn-primary m-2" onClick={handleOpenCreateModal}>
                Crear Nuevo Genero
            </button>

            <div className="row">
                {generoList.map((genero) => (
                    <div className="col">
                        <div key={genero._id} className="card mb-3 border-0 " style={{ width: '18rem' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title"> {genero.Nombre}</h5>
                                <p className="card-text"> {genero.Estado}</p>
                                <p className="card-text"> {genero.Descripcion}</p>
                            </div>

                            <div className="card-footer text-center">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm m-2"
                                    onClick={() => handleOpenUpdateModal(genero)}
                                >

                                    Actualizar
                                </button>
                                <button type="button" className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteGenero(genero._id)}>
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
                                    {isUpdating ? 'Actualizar Genero' : 'Crear Nuevo Genero'}
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
                                        value={currentGenero.Nombre}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        name="Estado"
                                        value={currentGenero.Estado}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input
                                        type="text"
                                        name="Descripcion" 
                                        value={currentGenero.Descripcion}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
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
                                    onClick={handleSaveGenero}
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


export default GeneroPages;