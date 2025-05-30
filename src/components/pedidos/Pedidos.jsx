import React, {Fragment, useEffect, useState} from "react";
import {clienteAxios} from "../../config/axios";
import RenderPedido from "./RenderPedido";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const Pedidos = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);

    async function getAllPedidos() {
        try {
            const response = await clienteAxios.get("/pedidos");
            if (response.status === 200 && response.data.length > 0) {
                setPedidos(response.data);
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "No hay pedidos en existencia",
                    text: "En este momento no hay pedidos en existencia",
                    timer: 3000
                })
            }
        }catch (e) {
            Swal.fire({
                icon: "error",
                title: "Ocurrio un error",
                text: "Ocurrio un error en el listado de pedidos",
                timer: 3000
            })
        }
    }

     async function eliminarPedido(pedido) {
        try {
            const response = await clienteAxios.delete(`/pedidos/${pedido._id}`);
            if (response.status === 200){
                Swal.fire({
                    icon: "success",
                    title: "Pedido eliminado",
                    text: "El pedido fue eliminado correctamente",
                    timer: 3000
                });
                // setPedidos(prev => prev.filter(p => p._id !== pedido._id));
                // getAllPedidos();
                setPedidos((prev) => {
                    return prev.filter((p) => {
                        return p._id !== pedido._id;
                    });
                });
            }
        }catch (e) {
            Swal.fire({
                icon: "error",
                title: "Error en eliminación",
                text: "Ocurrio un error en la eliminacion del producto",
                timer: 3000
            });
            navigate("/pedidos");
        }
    }

    useEffect(() => {
        getAllPedidos();
    }, []);

    return (
        <Fragment>
            <h2>Pedidos</h2>
            <ul className="listado-pedidos">
                {pedidos.map((pedido) => (
                    <RenderPedido key={pedido._id} pedido={pedido} eliminarPedido={eliminarPedido} />
                ))}
            </ul>
        </Fragment>
);
}

export default Pedidos;