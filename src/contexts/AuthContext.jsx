import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

//Hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

    const [usuario, setUsuario] = useState();

    //Estado para saber cuando se termina la comporobacion de onAuthStateChanged
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        //comprobar si hay un usuario
        const cancelarSuscripcion = auth.onAuthStateChanged((usuario) => {
            setUsuario(usuario);
            setCargando(false);
        });

        return cancelarSuscripcion;
    }, []);

    return ( 
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
     );
}
 
export { AuthProvider, AuthContext, useAuth };