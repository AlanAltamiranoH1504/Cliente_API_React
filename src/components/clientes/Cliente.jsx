import React, {useEffect, useState, Fragment, useContext} from "react";
import {clienteAxios} from "../../config/axios";
import ClienteDetalles from "./ClienteDetalle";
import {useNavigate} from "react-router-dom";
import {CRMContext} from "../context/CRMContext";
import {Link} from "react-router-dom";

const Cliente = () => {
    const navigate = useNavigate();
    //useState
    const [clientes, setClientes] = useState([]);
    //Uso de context
    const [auth, setAuth] = useContext(CRMContext);

    //Funciones
    async function consultarAPI() {
        if (auth.token !== "" && auth.auth == true){
            try {
                const listClientes = await clienteAxios.get("/clientes", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const {data} = listClientes;
                setClientes(data);
            }catch (e) {
                navigate("/iniciar-sesion");
            }
        } else {
            navigate("/iniciar-sesion");
        }
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