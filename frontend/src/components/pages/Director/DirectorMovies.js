import React, { useEffect, useState } from 'react'
import { getAllDirector } from '../../services/DirectorService'


const DirectorMovies = () => {
    const [directorList, setDirectorList] = useState([])
    const [showModal, setShowModal] = useState(false)

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

    return (
        <div className="container mt-4">
            <h1>Lista de Director</h1>
            <button className="btn btn-primary m-2" onClick={() => { setShowModal(true) }}>
                Crear NuevO Director
            </button>

            <div className="row">
                {directorList.map((director) => (
                    <div className="col">
                        <div key={director._id} className="card mb-3 border-0 " style={{ width: '18rem' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title">Titulo {director.Nombre_Director}</h5>
                                <p className="card-text">Genero {director.Estado}</p>
                            </div>

                            <div className="card-footer text-center">
                                {/* <button type="button" className="btn btn-success btn-sm m-2" onClick={() => handleEdit(media)}>Actualizar</button>
                                <button type="button" className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(media._id)}>Eliminar</button> */}
                            </div>
                        </div>
                    </div>
                ))}
                {/* {showModal && <CreateMediaPage onClose={() => setShowModal(false)} 
                    selectedMedia={selectedMedia} 
                    onUpdate={handleUpdate} />} */}
            </div>  </div>

    );
}


export default DirectorMovies;