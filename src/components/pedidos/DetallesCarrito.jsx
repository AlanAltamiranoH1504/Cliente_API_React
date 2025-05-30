import React, {Fragment} from "react";

const DetallesCarrito = ({carrito}) => {
    return (
        <Fragment>
            {carrito.map((item) => (
                item.cantidad > 0 ? (
                    <Fragment>
                        <li>
                            <p>Nombre: {item.nombre}</p>
                            <p>Precio: ${item.precio}</p>
                            <p>Cantidad: {item.cantidad}</p>
                        </li>
                    </Fragment>
                ):(
                    <Fragment></Fragment>
                )
            ))}
        </Fragment>
    )
}

export default DetallesCarrito;