import React, {Fragment, useState, useEffect, use, useContext} from "react";
import {useParams} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import TarjetaDetallesCliente from "./TarjetaDetallesCliente";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import ListProductosEncontrados from "./ListProductosEncontrados";
import DetallesCarrito from "./DetallesCarrito";
import {CRMContext} from "../context/CRMContext";

const NuevoPedido = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [productoBuscar, setProductoBuscar] = useState("");
    const [productoEncontrados, setProductosEncontrados] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [auth, setAuth] = useContext(CRMContext);

    function verificarAutenticacion() {
        if (auth.token === "" || auth.auth == false){
            navigate("/iniciar-sesion");
        }
    }

    async function buscarProducto(e) {
        e.preventDefault();
        try {
            //Obtenemos productos de la busqueda
            const response = await clienteAxios.post("/productos/producto/busqueda", {productoBuscar: productoBuscar}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                setProductosEncontrados(response.data);
            }
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Producto no encontrado",
                text: "No se encontro ningun producto con ese nombre o algo parecido",
                timer: 3000
            });
            navigate(`/pedidos/nuevo/${id}`);
        }
    }

    function productoBuscarVacio() {
        if (productoBuscar.trim() === "") {
            return true;
        } else {
            return false;
        }
    }

    function leerDatosBusqueda(e) {
        setProductoBuscar(e.target.value);
    }

    function carritoVacio() {
        if (carrito.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    function costoTotalCarrito() {
        const carritoVacioCondicion = carritoVacio();
        if (carritoVacioCondicion) {
        } else {
            const totalCarrito = carrito.reduce((total, item) => {
                return total + (item.cantidad * item.precio);
            }, 0);
            return totalCarrito;
        }
    }

    async function savePedido() {
        try {
            const productosFormato = carrito.map((producto) => {
                return {
                    producto: producto._id,
                    cantidad: producto.cantidad
                }
            });

            const response = await clienteAxios.post("/pedidos", {
                cliente: id,
                productos: productosFormato,
                total: costoTotalCarrito()
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Pedido agregado correctamente!",
                    text: "Pedido agregado por el cliente!",
                    timer: 3000
                })
                navigate("/pedidos");
            }
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo guardar el pedido",
                timer: 3000
            });
            navigate("/pedidos");
        }
    }

    useEffect(() => {
        verificarAutenticacion();
    }, []);

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <TarjetaDetallesCliente id={id}/>
            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
                productoBuscarVacio={productoBuscarVacio}
            />
            <ul className="resumen">
                {productoEncontrados.map((producto) => {
                    return (
                        <ListProductosEncontrados
                            key={producto._id}
                            producto={producto}
                            carrito={carrito}
                            setCarrito={setCarrito}
                        />
                    )
                })}
            </ul>

            <DetallesCarrito carrito={carrito}/>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readOnly="readonly"
                       value={costoTotalCarrito()}
                />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-verde" value="Realizar Pedido"
                       disabled={carritoVacio()}
                       onClick={savePedido}
                />
            </div>
        </Fragment>
    );
}

export default NuevoPedido;