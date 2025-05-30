import React, {Fragment, useState, useEffect, use} from "react";
import {useParams} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import TarjetaDetallesCliente from "./TarjetaDetallesCliente";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import ListProductosEncontrados from "./ListProductosEncontrados";

const NuevoPedido = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [productoBuscar, setProductoBuscar] = useState("");
    const [productoEncontrados, setProductosEncontrados] = useState([]);

    async function buscarProducto(e) {
        e.preventDefault();
        try {
            //Obtenemos productos de la busqueda
            const response = await clienteAxios.post("/productos/producto/busqueda", {productoBuscar: productoBuscar});
            if (response.status === 200){
                console.log("Se encontraron productos");
                setProductosEncontrados(response.data);
            }
        }catch (e) {
            Swal.fire({
                icon: "error",
                title: "Producto no encontrado",
                text: "No se encontro ningun producto con ese nombre o algo parecido",
                timer: 3000
            });
            navigate(`/pedidos/nuevo/${id}`);
        }
    }

    function leerDatosBusqueda(e) {
        setProductoBuscar(e.target.value);
    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <TarjetaDetallesCliente id={id} />
            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />
                <ul className="resumen">
                    {productoEncontrados.map((producto) => {
                        return (
                            <ListProductosEncontrados key={producto.id}  producto={producto} />
                        )
                    })}
                </ul>

                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readOnly="readonly"/>
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                </div>
        </Fragment>
    );
}

export default NuevoPedido;