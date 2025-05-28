import React, {Fragment} from "react";
import {Link} from "react-router-dom";

const Producto = ({producto}) => {
    return (
        <Fragment>
            <li className="producto">
                <div className="info-producto">
                    <p className="nombre">{producto.nombre}</p>
                    <p className="precio">${producto.precio}</p>
                    <img style={{width: "30%"}} src={producto.imagen ? producto.imagen: "/img/producto_default.png"} alt="Imagen de Producto"/>
                </div>
                <div className="acciones">
                    <Link to={`/productos/editar/${producto._id}`} className="btn btn-azul">Editar Producto</Link>
                    <Link to={`/productos/eliminar/${producto._id}`} className="btn btn-rojo btn-eliminar">Eliminar Producto</Link>
                </div>
            </li>
        </Fragment>
    );
}

export default Producto