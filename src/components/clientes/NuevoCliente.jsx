import React, {Fragment, useContext, useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

import {clienteAxios} from "../../config/axios";
import {CRMContext} from "../context/CRMContext";

const NuevoCliente = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(CRMContext);
    const [cliente, setCliente] = useState({
        nombre: "",
        apellidos: "",
        empresa: "",
        email: "",
        telefono: ""
    });
    console.log(auth)

    function verificarAutenticacion() {
        if (auth.toke === "" || auth.auth == false){
            navigate("/iniciar-sesion");
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

    async function saveCliente(e) {
        e.preventDefault();
        try {
            const response = await clienteAxios.post("/clientes/cliente", cliente, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 201){
                Swal.fire({
                    title: "Cliente agregado correctamente!",
                    text: "El cliente se agrego correctamente!",
                    icon: "success",
                    timer: 3000
                });
                navigate("/");
            }
        }catch (error) {
            Swal.fire({
                title: "Error en creacion de nuevo cliente!",
                text: error.response.data.error,
                icon: "error",
                timer: 3000
            });
            navigate("/");
        }
    }

    useEffect(() => {
        verificarAutenticacion();
    });

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={saveCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text" placeholder="Nombre Cliente" name="nombre"
                        onChange={actulizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text" placeholder="Apellido Cliente" name="apellidos"
                        onChange={actulizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text" placeholder="Empresa Cliente" name="empresa"
                        onChange={actulizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email" placeholder="Email Cliente" name="email"
                        onChange={actulizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="text" placeholder="Teléfono Cliente" name="telefono"
                        onChange={actulizarState}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit" className="btn btn-azul" value="Agregar Cliente"
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoCliente;