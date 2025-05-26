import React, {Fragment} from "react";

//Routing
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

//Layout
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

//Clientes
import Cliente from "./components/clientes/Cliente";

//Productos
import Productos from "./components/productos/Productos";

//Pedidos
import Pedidos from "./components/pedidos/Pedidos";

function App() {
    return (
        <Router>
            <Fragment>
                <Header/>

                <div className="grid contenedor contenido-principal">
                    <Navegacion/>
                    <main className="caja-contenido col-9">
                        <Routes>
                            <Route exact path="/" element={< Cliente />}></Route>
                            <Route exact path="/productos" element={<Productos/>}></Route>
                            <Route exact path="/pedidos" element={<Pedidos />}></Route>
                        </Routes>
                    </main>
                </div>
            </Fragment>
        </Router>
    );
}


export default App;
