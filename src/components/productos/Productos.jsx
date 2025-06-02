import React, {useEffect, useState, Fragment} from "react";
import {clienteAxios} from "../../config/axios";
import Producto from "./Producto";
import {Link} from "react-router-dom";

const Productos = () => {

    const [productos, setProductos] = useState([]);

    //Funciones
    async function peticionAPI () {
        try {
            const response = await clienteAxios.get("/productos",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setProductos(response.data);
        }catch (e) {
            console.log("Error en busqueda de productos");
            console.log(e.message);
        }
    }

    useEffect(() => {
        peticionAPI()
    }, []);

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">Nuevo Producto</Link>

            <ul className="listado-productos">
                {productos.map((producto) => (
                    <Producto key={producto._id} producto={producto}></Producto>
                ))}
            </ul>
        </Fragment>
    );
}

export default Productos;