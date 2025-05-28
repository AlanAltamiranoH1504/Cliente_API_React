import React from "react";
import {Link} from "react-router-dom";

const ClienteDetalles = ({cliente}) => {

    const {nombre, apellidos, empresa, email, telefono} = cliente;
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre + " " + apellidos}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>{telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-azul">Editar Cliente</Link>
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
}
export default ClienteDetalles;