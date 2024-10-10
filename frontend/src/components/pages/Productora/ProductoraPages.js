import React, { useEffect, useState } from 'react';
import { CreateProductora, getAllProductora, UpdateProductora, deleteProductora } from '../../services/ProductoraServices';
import Swal from 'sweetalert2';

const ProductoraPages = () => {
    const [ProductoraList, setProductoraList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentProductora, setCurrentProductora] = useState({ Nombre_Productora: '', Estado: '', Slogan: '', Descripcion: '' });

    useEffect(() => {
        fetchProductora();
    }, []);

    const fetchProductora = async () => {
        try {
            const data = await getAllProductora();
            if (data && Array.isArray(data)) {
                setProductoraList(data);
            } else {
                console.error('Los datos obtenidos no son válidos:', data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de productoras:', error);
        }
    };

    const handleOpenCreateModal = () => {
        setCurrentProductora({ Nombre_Productora: '', Estado: '', Slogan: '', Descripcion: '' });
        setIsUpdating(false);
        setShowModal(true);
    };

    const handleOpenUpdateModal = (Productora) => {
        setCurrentProductora(Productora);
        setIsUpdating(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                fetchProductora();
                handleCloseModal();

                Swal.fire({
                    title: 'Productora Actualizada',
                    text: 'La productora ha sido actualizada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                console.error('Error al actualizar la productora:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al actualizar la productora',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            try {
                await CreateProductora(currentProductora);
                fetchProductora();
                handleCloseModal();

                Swal.fire({
                    title: 'Productora Creada',
                    text: 'La productora ha sido creada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                console.error('Error al crear la productora:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al crear la productora',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const handleDeleteProductora = async (Productoraid) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteProductora(Productoraid);
                fetchProductora();

                Swal.fire(
                    'Eliminada',
                    'La productora ha sido eliminada.',
                    'success'
                );
            } catch (error) {
                console.error('Error al eliminar la productora:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar la productora',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Lista de Productora</h1>
                <button className="btn btn-primary" onClick={handleOpenCreateModal}>
                    Crear Nueva Productora
                </button>
            </div>

            <div className="row g-4">
                {ProductoraList.map((Productora) => (
                    <div key={Productora._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 shadow border-0">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title text-center mb-3">
                                    {Productora.Nombre_Productora}
                                </h5>
                                <p className="card-text text-center">
                                    <strong>Estado: </strong>{Productora.Estado}
                                </p>
                                <p className="card-text text-center">
                                    {Productora.Descripcion}
                                </p>
                            </div>
                            <div className="card-footer text-center bg-light border-0">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm m-1"
                                    onClick={() => handleOpenUpdateModal(Productora)}
                                >
                                    Actualizar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm m-1"
                                    onClick={() => handleDeleteProductora(Productora._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para creación/actualización */}
            {showModal && (
                <div className="modal show d-block fade" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    {isUpdating ? 'Actualizar Productora' : 'Crear Nueva Productora'}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        name="Nombre_Productora"
                                        value={currentProductora.Nombre_Productora}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Ingresa el nombre de la productora"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select
                                        name="Estado"
                                        value={currentProductora.Estado}
                                        onChange={handleInputChange}
                                        className="form-select"
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Slogan</label>
                                    <input
                                        type="text"
                                        name="Slogan"
                                        value={currentProductora.Slogan}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Ingresa el slogan de la productora"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        name="Descripcion"
                                        value={currentProductora.Descripcion}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows="3"
                                        placeholder="Describe la productora"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveProductora}>
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

export default ProductoraPages;
