import React, {Fragment, useEffect, useState} from "react";
import {clienteAxios} from "../../config/axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const TarjetaDetallesCliente = ({id}) => {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({});

    async function getCliente(){
        try {
            const response = await clienteAxios.get(`/clientes/cliente/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200){
                setCliente(response.data);
            }
        }catch (e) {
            Swal.fire({
                icon: "error",
                title: "Error en localizacion de cliente",
                text: "No se encontro un cliente con ese id",
                timer: 3000
            })
            navigate("/");
        }
    }

    useEffect(() => {
        getCliente();
    }, [])

    if (!cliente){
        return (
            <p>Cargando Busqueda de Cliente...</p>
        )
    }

    return (
        <Fragment>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellidos}</p>
                <p>E-Mail: {cliente.email}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>
        </Fragment>
    )
}

export default TarjetaDetallesCliente;