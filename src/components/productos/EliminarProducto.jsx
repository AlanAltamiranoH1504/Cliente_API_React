import React, {Fragment, useContext} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import Swal from "sweetalert2";
import {CRMContext} from "../context/CRMContext";

const EliminarProducto = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(CRMContext);
    deleteProducto();

    async function deleteProducto() {
        if (auth.token !== "" && auth.auth) {
            try {
                const response = await clienteAxios.delete(`/productos/producto/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Producto eliminado correctamente",
                        text: "El producto fue eliminado correctamente.",
                        timer: 3000
                    });
                    navigate("/productos");
                }
            } catch (e) {
                Swal.fire({
                    icon: "erro",
                    title: "Producto eliminado incorrectamente",
                    text: "Hubo un error en la eliminacion del producto.",
                    timer: 3000
                });
                navigate("/productos");
            }
        } else {
            navigate("/iniciar-sesion");
        }
    }

    return (
        <Fragment>
            <h2>Eliminar Producto</h2>
        </Fragment>
    );
}

export default EliminarProducto;