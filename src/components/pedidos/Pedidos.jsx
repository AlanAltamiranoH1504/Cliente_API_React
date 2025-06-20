import React, {Fragment, useContext, useEffect, useState} from "react";
import {clienteAxios} from "../../config/axios";
import RenderPedido from "./RenderPedido";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {CRMContext} from "../context/CRMContext";

const Pedidos = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [auth, setAuth] = useContext(CRMContext);

    async function getAllPedidos() {
        if (auth.token !== "" && auth.auth) {
            try {
                const response = await clienteAxios.get("/pedidos", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.status === 200 && response.data.length > 0) {
                    setPedidos(response.data);
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "No hay pedidos en existencia",
                        text: "En este momento no hay pedidos en existencia",
                        timer: 3000
                    });
                    setPedidos(response.data);
                }
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Ocurrio un error",
                    text: "Ocurrio un error en el listado de pedidos",
                    timer: 3000
                })
            }
        } else {
            navigate("/iniciar-sesion");
        }
    }

    async function eliminarPedido(pedido) {
        try {
            const response = await clienteAxios.delete(`/pedidos/${pedido._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
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
        } catch (e) {
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
                    <RenderPedido key={pedido._id} pedido={pedido} eliminarPedido={eliminarPedido}/>
                ))}
            </ul>
        </Fragment>
    );
}

export default Pedidos;