import React, {useState, createContext} from "react";

const CRMContext = createContext([{}, () => {}]);
const CRMProvider = (props) => {
    //Definicion de state inicial
    const [auth, setAuth] = useState({
        token: "",
        auth: false
    });

    return(
        <CRMContext.Provider value={[auth, setAuth]}>
            {props.children}
        </CRMContext.Provider>
    )
}

export {
    CRMContext,
    CRMProvider
}