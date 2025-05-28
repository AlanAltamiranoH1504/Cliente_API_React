import React, {Fragment} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {clienteAxios} from "../../config/axios";
import Swal from "sweetalert2";

const EliminarProducto = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    deleteProducto();

    async function deleteProducto(){
        try {
            const response = await clienteAxios.delete(`/productos/producto/${id}`);
            if (response.status === 200){
                Swal.fire({
                    icon: "success",
                    title: "Producto eliminado correctamente",
                    text: "El producto fue eliminado correctamente.",
                    timer: 3000
                });
                navigate("/productos");
            }
        }catch (e) {
            Swal.fire({
                icon: "erro",
                title: "Producto eliminado incorrectamente",
                text: "Hubo un error en la eliminacion del producto.",
                timer: 3000
            });
            navigate("/productos");
        }
    }

    return (
        <Fragment>
            <h2>Eliminar Producto</h2>
        </Fragment>
    );
}

export default EliminarProducto;