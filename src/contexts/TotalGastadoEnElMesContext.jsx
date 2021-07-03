import React, { useState, useEffect, useContext, createContext } from 'react';
import useObtenetGastosDelMes from '../hooks/useObtenerGastosDelMes';

const TotalGastadoContext = createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext);

const TotalGastadoProvider = ({children}) => {

    const [total, setTotal] = useState(0);
    const gastos = useObtenetGastosDelMes();

    useEffect(() => {
        let acumulado = 0;
        gastos.forEach((gasto) => {
            acumulado += gasto.cantidad
        })
        
        setTotal(acumulado);
    }, [gastos]);

    return (
        <TotalGastadoContext.Provider value={{total}}>
            { children }
        </TotalGastadoContext.Provider>
    );
}

export { TotalGastadoProvider, useTotalDelMes };