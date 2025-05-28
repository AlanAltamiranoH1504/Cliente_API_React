import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import Swal from "sweetalert2";

const EditarProducto = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [producto, setProducto] = useState({});

    async function findProducto() {
        try {
            const response = await clienteAxios.get(`/productos/producto/${id}`);
            if (response.status === 200) {
                setProducto(response.data);
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Error en busqueda de producto',
                timer: 3000,
                text: "Producto no existente"
            });
            navigate("/productos");
        }
    }

    function acualizarState(e) {
        setProducto({
            ...producto, [e.target.name]: e.target.value
        });
    }

    function validacionProducto() {
        const {nombre, precio} = producto;
        if (nombre && precio) {
            return false;
        } else {
            return true;
        }
    }

    async function updateProducto(e){
        e.preventDefault();
        try {
            const response = await clienteAxios.put(`/productos/producto/${id}`, producto);
            if (response.status === 200){
                Swal.fire({
                    icon: "success",
                    title: "Producto actualizado",
                    text: "Producto actualizado correctamente",
                    timer: 3000,
                });
                navigate("/productos");
            }
        }catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Error en actualizacion de producto',
                timer: 3000,
                text: "Producto actualizado incorrectamente",
            })
        }
    }

    useEffect(() => {
        findProducto();
    }, []);

    if (!producto){
        return <p>Cargando Producto...</p>
    }

    return (
        <Fragment>
            <h2>Editando Producto</h2>

            <form action="" method="POST" onSubmit={updateProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text" placeholder="Nombre Producto" name="nombre"
                        onChange={acualizarState}
                        value={producto.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="number" name="precio" min="0.00" step="0.01" placeholder="Precio"
                        onChange={acualizarState}
                        value={producto.precio}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" name="imagen"/>
                </div>

                <div className="enviar">
                    <input
                        type="submit" className="btn btn-azul" value="Actualizar Producto"
                        disabled={validacionProducto()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarProducto;