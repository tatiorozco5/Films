import React, { useEffect, useState } from 'react'
import { CreateProductora, getAllProductora, UpdateProductora, deleteProductora } from '../../services/ProductoraServices'


const ProductoraPages = () => {
    const [ProductoraList, setProductoraList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentProductora, setCurrentProductora] = useState({ Nombre_Productora: '', Estado: '', Slogan: '', Descripcion: '' });

    useEffect(() => {
        fetchProductora()
    }, [])

    const fetchProductora = async () => {
        try {
            const data = await getAllProductora();
            if (data && Array.isArray(data)) {
                setProductoraList(data);
            } else {
                console.error('Los datos obtenidos no son válidos:', data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de medios:', error);
        }
    }

    const handleOpenCreateModal = () => {
        setCurrentProductora({ Nombre_Productora: '', Estado: '', Slogan: '', Descripcion: '' });
        setIsUpdating(false);
        setShowModal(true);
    }

    const handleOpenUpdateModal = (Productora) => {
        setCurrentProductora(Productora);
        setIsUpdating(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProductora((prevProductora) => ({
            ...prevProductora,
            [name]: value
        }));
    };

    const handleSaveProductora = async () => {
        if (isUpdating) {
            try {
                await UpdateProductora(currentProductora._id, currentProductora);
                fetchProductora(); // Recargar la lista de Productoras
                handleCloseModal(); // Cerrar el modal
            } catch (error) {
                console.error('Error al actualizar el Productora:', error);
            }
        } else {
            try {
                // Verifica los datos antes de enviarlos
                console.log('Datos a enviar:', currentProductora);

                await CreateProductora(currentProductora); // Aquí haces la creación
                fetchProductora(); // Recargar la lista de Productoras
                handleCloseModal(); // Cerrar el modal
            } catch (error) {
                console.error('Error al crear el Productora:', error);
            }
        }
    };

    const handleDeleteProductora = async (Productoraid) => {
        const ConfirmDelete = window.confirm("Estas seguro que deseas eliminar este Productora")
        if (ConfirmDelete) {
            try {
                await deleteProductora(Productoraid);
                fetchProductora()
            } catch (error) {
                console.error("Error al eliminar el Productora", error);

            }
        }
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Productora</h1>
            <button className="btn btn-primary m-2" onClick={handleOpenCreateModal}>
                Crear Nuevo Productora
            </button>

            <div className="row">
                {ProductoraList.map((Productora) => (
                    <div className="col">
                        <div key={Productora._id} className="card mb-3 border-0 " style={{ width: '18rem' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title"> {Productora.Nombre_Productora}</h5>
                                <p className="card-text"> {Productora.Estado}</p>
                                <p className="card-text"> {Productora.Descripcion}</p>
                            </div>

                            <div className="card-footer text-center">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm m-2"
                                    onClick={() => handleOpenUpdateModal(Productora)}
                                >

                                    Actualizar
                                </button>
                                <button type="button" className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteProductora(Productora._id)}>
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
                                    {isUpdating ? 'Actualizar Productora' : 'Crear Nuevo Productora'}
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
                                        name="Nombre_Productora"
                                        value={currentProductora.Nombre_Productora}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        name="Estado"
                                        value={currentProductora.Estado}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Slogan</label>
                                    <input
                                        type="text"
                                        name="Slogan"
                                        value={currentProductora.Slogan}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input
                                        type="text"
                                        name="Descripcion"
                                        value={currentProductora.Descripcion}
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
                                    onClick={handleSaveProductora}
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


export default ProductoraPages;