import React, {Fragment} from "react";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {clienteAxios} from "../../config/axios";

const EliminarCliente = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    eliminarCliente();

    //Funciones
    async function eliminarCliente(){
        try {
            const response = await clienteAxios.delete(`/clientes/cliente/${id}`);
            if (response.status === 200){
                Swal.fire({
                    title: "Cliente eliminado correctamente!",
                    icon: "success",
                    timer: 3000,
                    text: "El cliente fue eliminado correctamente.",
                });
                navigate("/");
            }
        }catch (e) {
            Swal.fire({
                title: "Error en eliminacion de cliente",
                icon: "error",
                timer: 3000,
                text: "Ocurrio un error en la eliminacion del cliente"
            });
            navigate("/");
        }
    }

    return (
        <Fragment>
            <h2>Eliminando cliente</h2>
        </Fragment>
    );
}

export default EliminarCliente;