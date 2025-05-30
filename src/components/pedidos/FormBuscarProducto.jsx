import React, {Fragment} from "react";

const FormBuscarProducto = ({buscarProducto, leerDatosBusqueda, productoBuscarVacio}) => {
    return(
        <Fragment>
            <form
                onSubmit={buscarProducto}
            >
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div className="campo">
                    <label>Productos:</label>
                    <input
                        type="text" placeholder="Nombre Productos" name="productos"
                        onChange={leerDatosBusqueda}
                    />
                </div>

                <input disabled={productoBuscarVacio()} type="submit" className="btn btn-azul btn-block" value="Buscar Producto"/>
            </form>
        </Fragment>
    )
}

export default FormBuscarProducto;