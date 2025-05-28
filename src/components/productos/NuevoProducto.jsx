import React, {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import Swal from "sweetalert2";

const NuevoProducto = () => {
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        imagen: ""
    });

    function actualizarProducto(e){
        setProducto({
            ...producto, [e.target.name]: e.target.value
        });
    }

    function validarProducto() {
        const {nombre, precio} = producto;

        if (nombre && precio) {
            return false;
        } else {
            return true;
        }
    }

    async function saveProducto(e) {
        e.preventDefault();
        try {
            const response = await clienteAxios.post("/productos/producto", producto);
            if (response.status === 201){
                Swal.fire({
                    icon: "success",
                    title: "Producto guardado correctamente!",
                    text: "El producto fue agregado correctamente",
                    timer: 3000
                })
                navigate("/productos");
            }
        }catch (e) {
            Swal.fire({
                icon: "error",
                title: "Error el producto no fue agregado!",
                text: "Hubo un error en la creacion del producto",
                timer: 3000
            });
            navigate("/productos");
        }
    }

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form action="" method="POST" onSubmit={saveProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text" placeholder="Nombre Producto" name="nombre"
                        onChange={actualizarProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="text" name="precio"  placeholder="Precio"
                        onChange={actualizarProducto}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input
                        type="file" name="imagen"
                        onChange={actualizarProducto}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit" className="btn btn-azul" value="Agregar Producto"
                        disabled={validarProducto()}
                    />
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoProducto;