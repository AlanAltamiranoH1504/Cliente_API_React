import React, {Fragment, useEffect} from "react";
import {post} from "axios";

const ListProductosEncontrados = ({producto, carrito, setCarrito}) => {

    function agregarCarrito(producto) {
        const itemExistente = carrito.findIndex((item) => {
            return item._id == producto._id;
        });

        if (itemExistente >= 0) {
            const updatedCarrito = [...carrito];
            updatedCarrito[itemExistente].cantidad++;
            setCarrito(updatedCarrito);
        } else {
            producto.cantidad = 1;
            setCarrito([...carrito, producto]);
        }
    }

    function bajarCantidadDeCarrito(producto) {
        const updateCarrito = carrito.map((item) => {
            if (producto._id === item._id) {
                const nuevaCantidad = item.cantidad -1;
                if (nuevaCantidad <= 0) {
                    return null;
                }
                return { ...item, cantidad: nuevaCantidad };
            }
            return item;
        }).filter(Boolean);
        setCarrito(updateCarrito);
    }

    function eliminarProductoDeCarrito(producto) {
        const updatedCarrito = carrito.filter((item) => {
            return producto._id !== item._id;
        });
        setCarrito(updatedCarrito);
    }

    return (
        <Fragment>
            <li>
                <div className="texto-producto">
                    <p className="nombre">{producto.nombre}</p>
                    <p className="precio">${producto.precio}</p>
                </div>
                <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus"
                           onClick={() => {
                               bajarCantidadDeCarrito(producto);
                           }}
                        >-</i>
                        <input type="text" name="cantidad" disabled/>
                        <i
                            className="fas fa-plus"
                            onClick={() => {
                                agregarCarrito(producto);
                            }}
                        >+</i>
                    </div>
                    <button type="button" className="btn btn-rojo"
                            onClick={() => {
                                eliminarProductoDeCarrito(producto)
                            }}>
                        <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                    </button>
                </div>
            </li>
        </Fragment>
    )
}

export default ListProductosEncontrados;