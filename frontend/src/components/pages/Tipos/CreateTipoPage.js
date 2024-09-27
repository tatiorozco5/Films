import React, { useEffect, useState } from 'react';
import { CreateTipo } from '../../services/TipoServices';


const CreateTipoPage = ({ onClose, onTipoCreated }) => {
    const [newTipo, setNewTipo] = useState({
        Nombre: '',
        Descripcion: ''

    })

    const handleInputChange = (e) => {
        setNewTipo({ ...newTipo, [e.target.name]: e.target.value })
    }

    const handleCreateTipo = async () => {
        try {
            const result = await CreateTipo(newTipo);
            alert('Tipo creado exitosamente!');
            onTipoCreated();
            onClose();
        } catch (error) {
            console.error('Error al crear el tipo:', error);
            alert('Error al crear el tipo. Intenta nuevamente.');
        }
    };

    return (
        <>        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Nuevo Tipo</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="Nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Nombre"
                                name="Nombre"
                                value={newTipo.Nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Descripcion" className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                id="Descripcion"
                                name="Descripcion"
                                value={newTipo.Descripcion}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleCreateTipo}>
                            Crear
                        </button>
                    </div>
                </div>
            </div>
        </div> <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Crear Nuevo Tipo</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="Nombre" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Nombre"
                                    name="Nombre"
                                    value={newTipo.Nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Descripcion" className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="Descripcion"
                                    name="Descripcion"
                                    value={newTipo.Descripcion}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleCreateTipo}>
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CreateTipoPage;