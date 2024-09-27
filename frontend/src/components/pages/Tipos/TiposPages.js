import React, { useEffect, useState } from 'react'
import { getAllTipos } from '../../services/TipoServices'


const TiposPage = () => {
    const [TipoList, setTipoList] = useState([])

    useEffect(() => {
        fetchTipo()
    }, [])

    const fetchTipo = async () => {
        try {
            const data = await getAllTipos()
            if (Array.isArray(data)) {
                setTipoList(data)
            } else {
                console.log("Se esperaba una matriz, pero se obtuvo:", data);
                setTipoList([])
            }
        } catch (error) {
            console.error("Error al obtener los tipos:", error)
            setTipoList([])

        }
    }

    const formatearFecha = (fecha) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Bogota'
        }).format(new Date(fecha));
    }
    return (
        <div className="container mt-4">
            <h1>Tipos de Películas</h1>
            <button className="btn btn-primary m-2 btn-sm" >
                Crear Nueva Tipo
            </button>
            <div className="row">
                {TipoList.map((tipo) => (
                    <div className="col">
                        <div key={tipo._id} className="card mb-3 border-0 " style={{ width: '18rem' }}>
                            <div class="card-body">
                                <h5 class="card-title">{tipo.Nombre}</h5>
                                <p class="card-text">{tipo.Descripcion}</p>
                                <button type="button" className="btn btn-success btn-sm m-2">Actualizar</button>
                                <button type="button" className="btn btn-danger btn-sm m-2">Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TiposPage