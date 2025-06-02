import React, {Fragment, useContext, useState} from "react";
import {clienteAxios} from "../../config/axios";
import {useNavigate} from "react-router-dom";
import {CRMContext} from "../context/CRMContext";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({
        email: "",
        password: ""
    });
    const [auth, setAuth] = useContext(CRMContext);

    function leerDatos(e) {
        setFormulario({
            ...formulario, [e.target.name]: e.target.value
        });
    }

    function validarFormulario() {
        const {email, password} = formulario;
        if (email.trim() === "" || password.trim() === "") {
            return true;
        } else {
            return false;
        }
    }

    async function peticionInicioSesion(e){
        e.preventDefault();
        try {
            const response = await clienteAxios.post("/usuarios/autenticacion", formulario);
            const token = response.data.token;
            seteoToken(token);
            setAuth({
                token,
                auth: true
            })
            if (response.status === 200){
                Swal.fire({
                    icon: "success",
                    title: "Iniciado Sesion",
                    text: "Autenticacion exitosa",
                    confirmButtonText: "Aceptar"
                }).then((result) => {
                    if (result.isConfirmed){
                        navigate("/");
                    }
                });
            }
        }catch (e) {
            Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                text: e.response.data.error,
                timer: 3000
            });
        }
    }

    function seteoToken(token){
        if (localStorage.getItem("token")){
            localStorage.removeItem("token");
            localStorage.setItem("token", token);
        }else {
            localStorage.setItem("token",token);
        }
    }

    return (
        <Fragment>
            <div className="login">
                <h2>Iniciar Sesión</h2>
                <div className="contenedor-formulario">
                    <form onSubmit={peticionInicioSesion}>
                        <div className="campo">
                            <label for="email">Email:</label>
                            <input
                                type="email" name="email" placeholder="Ingresa tu email" required
                                onChange={leerDatos}
                            />
                        </div>
                        <div className="campo">
                            <label form="password">Password:</label>
                            <input
                                type="password" name="password" placeholder="Ingresa tu password" required
                                onChange={leerDatos}
                            />
                        </div>
                        <div className={"campo"}>
                            <input
                                type={"submit"} value={"Iniciar Sesión"} className={"btn btn-verde btn-block"}
                                disabled={validarFormulario()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;