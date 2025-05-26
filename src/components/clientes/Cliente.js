import React, {useEffect, useState, Fragment} from "react";
import {clienteAxios} from "../../config/axios";
import ClienteDetalles from "./ClienteDetalle";
import {Link} from "react-router-dom";

const Cliente = () => {
    //useState
    const [clientes, setClientes] = useState([])

    //Funciones
    async function consultarAPI() {
        const listClientes = await clienteAxios.get("/clientes");
        const {data} = listClientes;
        setClientes(data);
    }

    //UseEffect detecta cambios en algun useState
    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">Nuevo Cliente</Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <ClienteDetalles key={cliente._id} cliente={cliente}/>
                ))}
            </ul>
        </Fragment>
    );
}
export default Cliente;