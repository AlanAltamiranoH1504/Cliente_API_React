import React, {Fragment} from "react";

const DetallesCarrito = ({carrito}) => {
    return (
        <Fragment>
            {carrito.map((item) => {
                return (
                    <li key={item._id}>
                        <p>Nombre: {item.nombre}</p>
                        <p>Precio: {item.precio}</p>
                        <p>Cantidad: {item.cantidad}</p>
                    </li>
                )
            })}
        </Fragment>
    )
}

export default DetallesCarrito;