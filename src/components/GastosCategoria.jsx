import React from 'react';
import { Header, Titulo} from './../elements/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elements/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from '../elements/ElementosDeLista';
import IconoCategoria from '../elements/IconoCategoria';
import formatearCantidad from '../funciones/formatearCantidad';

const GastosCategoria = () => {

    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();
    
    return ( 
        <>
            <Helmet>
                <title>Gastos por Categoria</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Gastos por Categoria</Titulo>
            </Header>

            <ListaDeCategorias>
                {gastosPorCategoria.map((elemento, index) => {
                    return(
                        <ElementoListaCategorias key={index}>
                            <Categoria>
                                <IconoCategoria id={elemento.categoria} />
                                { elemento.categoria }
                            </Categoria>
                            <Valor>{ formatearCantidad(elemento.cantidad) }</Valor>
                        </ElementoListaCategorias>
                    );
                })}
            </ListaDeCategorias>

            <BarraTotalGastado />
        </>
     );
}
 
export default GastosCategoria;