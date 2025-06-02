import React, {Fragment, useContext} from "react";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import {CRMContext} from "../context/CRMContext";

const EliminarCliente = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [auth, setAuth] = useContext(CRMContext);
    eliminarCliente();

    //Funciones
    async function eliminarCliente() {
        if (auth.token !== "" && auth.auth) {
            try {
                const response = await clienteAxios.delete(`/clientes/cliente/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.status === 200) {
                    Swal.fire({
                        title: "Cliente eliminado correctamente!",
                        icon: "success",
                        timer: 3000,
                        text: "El cliente fue eliminado correctamente.",
                    });
                    navigate("/");
                }
            } catch (e) {
                Swal.fire({
                    title: "Error en eliminacion de cliente",
                    icon: "error",
                    timer: 3000,
                    text: "Ocurrio un error en la eliminacion del cliente"
                });
                navigate("/");
            }
        } else {
            navigate("/iniciar-sesion");
        }
    }

    return (
        <Fragment>
            <h2>Eliminando cliente</h2>
        </Fragment>
    );
}

export default EliminarCliente;