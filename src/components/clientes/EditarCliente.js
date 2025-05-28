import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {clienteAxios} from "../../config/axios";

const EditarCliente = (props) => {
    //Obtencion id de react router dom
    const {id} = useParams();
    const [cliente, setCliente] = useState(null);

    async function busquedaCliente() {
        try {
            const response = await clienteAxios.get(`/clientes/cliente/${id}`);
            setCliente(response.data);
        }catch (e) {
            console.log("Error en busqueda de cliente: " + e.message);
        }
    }

    function actulizarState(e) {
        setCliente({
            ...cliente, [e.target.name]: e.target.value
        });
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
            <form>
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
                        type="submit" className="btn btn-azul" value="Agregar Cliente"
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarCliente;