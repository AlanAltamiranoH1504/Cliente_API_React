import React, {Fragment, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {CRMContext} from "../context/CRMContext";

const Navegacion = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(CRMContext);

    function cerrarSesion() {
        localStorage.clear();
        navigate("/iniciar-sesion");
        setAuth({
            token: "",
            auth: false
        });
    }
    return (
        <>
            {auth.token !== "" && auth.auth == true ? (
                <aside className="sidebar col-3">
                    <h2>Administración</h2>

                    <nav className="navegacion">
                        <Link to={"/"} className="clientes">Clientes</Link>
                        <Link to={"/productos"} className="productos">Productos</Link>
                        <Link to={"/pedidos"} className="pedidos">Pedidos</Link>
                        <button onClick={cerrarSesion} className="btn btn-rojo">Cerrar Sesión</button>
                    </nav>
                </aside>
            ):(
                <Fragment></Fragment>
            )}
        </>
    );
}

export default Navegacion;