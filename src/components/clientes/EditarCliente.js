import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import Swal from "sweetalert2";

const EditarCliente = () => {
    //Obtencion id de react router dom
    const {id} = useParams();
    const [cliente, setCliente] = useState(null);
    const navigate = useNavigate();

    async function busquedaCliente() {
        try {
            const response = await clienteAxios.get(`/clientes/cliente/${id}`);
            setCliente(response.data);
        }catch (e) {
            Swal.fire({
                title: "Error en busqueda de cliente",
                text: "No se encontro un cliente con el ID: "  + id,
                icon: "error",
                timer: 3000,
            });
            navigate("/");
        }
    }

    function actulizarState(e) {
        setCliente({
            ...cliente, [e.target.name]: e.target.value
        });
    }
    function validarCliente() {
        const {nombre, apellidos, empresa, email, telefono} = cliente;
        if (nombre, apellidos, empresa, empresa, empresa, telefono){
            return false;
        }else {
            return true;
        }
    }

    async function updateCliente(e){
        e.preventDefault();
        try {
            const response = await clienteAxios.put(`/clientes/cliente/${id}`, cliente);
            if (response.status === 200){
                Swal.fire({
                    icon: "success",
                    title: "Actualizacion de Cliente",
                    text: "Cliente actualizado correctamente",
                    timer: 3000
                });
                navigate("/");
            }
        }catch (e) {
            Swal.fire({
                title: "Error en actualizacion de cliente",
                text: "Hubo un error en la actualizacion del cliente: " + id,
                icon: "error",
                timer: 3000,
            });
            navigate("/");
        }
    }

    useEffect(() => {
        busquedaCliente();
    }, []);

    if (!cliente) {
        return <p>Cargando cliente...</p>;
    }
    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form
                onSubmit={updateCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text" placeholder="Nombre Cliente" name="nombre"
                        onChange={actulizarState}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text" placeholder="Apellido Cliente" name="apellidos"
                        onChange={actulizarState}
                        value={cliente.apellidos}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text" placeholder="Empresa Cliente" name="empresa"
                        onChange={actulizarState}
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email" placeholder="Email Cliente" name="email"
                        onChange={actulizarState}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="text" placeholder="Teléfono Cliente" name="telefono"
                        onChange={actulizarState}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit" className="btn btn-azul" value="Actualizar Cliente"
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarCliente;