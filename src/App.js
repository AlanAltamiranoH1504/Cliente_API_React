import React, {Fragment} from "react";

//Routing
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

//Layout
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

//Clientes
import Cliente from "./components/clientes/Cliente";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";
import EliminarCliente from "./components/clientes/EliminarCliente";

//Productos
import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EliminarProducto from "./components/productos/EliminarProducto";

//Pedidos
import Pedidos from "./components/pedidos/Pedidos";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoPedido from "./components/pedidos/NuevoPedido";


function App() {
    return (
        <Router>
            <Fragment>
                <Header/>

                <div className="grid contenedor contenido-principal">
                    <Navegacion/>
                    <main className="caja-contenido col-9">
                        <Routes>
                            {/*Rutas de Clientes*/}
                            <Route exact path="/" element={< Cliente />}></Route>
                            <Route exact path="/clientes/nuevo" element={<NuevoCliente/>}></Route>
                            <Route exact path="/clientes/editar/:id" element={<EditarCliente />}></Route>
                            <Route exact path="/clientes/eliminar/:id" element={<EliminarCliente/>}></Route>

                            {/*Rutas de Productos*/}
                            <Route exact path="/productos" element={<Productos/>}></Route>
                            <Route exact path="/productos/nuevo" element={<NuevoProducto />}></Route>
                            <Route exact path="/productos/editar/:id" element={<EditarProducto />}></Route>
                            <Route exact path="/productos/eliminar/:id" element={<EliminarProducto />}></Route>

                            {/*Rutas de Pedidos*/}
                            <Route exact path="/pedidos" element={<Pedidos />}></Route>
                            <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido />}></Route>
                        </Routes>
                    </main>
                </div>
            </Fragment>
        </Router>
    );
}


export default App;
