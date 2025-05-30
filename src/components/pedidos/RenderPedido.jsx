import React, {Fragment} from "react";
import {clienteAxios} from "../../config/axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import producto from "../productos/Producto";

const RenderPedido = ({pedido, eliminarPedido}) => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <li className="pedido">
                <div className="info-pedido">
                    <p className="id">ID: {pedido._id}</p>
                    <p className="nombre">Cliente: {pedido.cliente.nombre} {pedido.cliente.apellidos}</p>

                    <div className="articulos-pedido">
                        <p className="productos">Artículos Pedido: </p>
                        <ul>
                            {pedido.productos.map((producto) => {
                                return (
                                    <li key={producto.producto._id}>
                                        <p>{producto.producto.nombre}</p>
                                        <p>Precio: ${producto.producto.precio}</p>
                                        <p>Cantidad: {producto.cantidad}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <p className="total">Total: ${pedido.total}</p>
                </div>
                <div className="acciones">
                    <button type="button" className="btn btn-rojo btn-eliminar"
                        onClick={() =>{
                            eliminarPedido(pedido);
                        }}
                    >
                        <i className="fas fa-times"></i>
                        Eliminar Pedido
                    </button>
                </div>
            </li>
        </Fragment>
    )
}

export default RenderPedido;