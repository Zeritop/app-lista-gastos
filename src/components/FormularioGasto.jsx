import React, { useState, useEffect } from 'react'
import { 
    ContenedorFiltros,Formulario,
    Input, InputGrande, ContenedorBoton 
} from '../elements/ElementosDeFormulario';
import Boton from '../elements/Boton';
import { ReactComponent as IconoPLus } from '../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { useAuth } from '../contexts/AuthContext';
import Alerta from '../elements/Alerta';
import { useHistory } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';
import formatearCantidad from '../funciones/formatearCantidad'; 

const FormularioGasto = ({gasto}) => {

    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());
    const {usuario} = useAuth();
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({}); 
    const history = useHistory();

    useEffect(() => {
        //comprobar si ya hay algun gasto 
        //De ser asi establecemos todo el state con los valores del gasto.
       if(gasto){
            //comprobar que el gasto sea del usuario actual
            //Para eso comprobamos el uid guardado  en el gasto con el uid del usuario
            if(gasto.data().uidUsuario === usuario.uid){
                setCategoria(gasto.data().categoria);
                setFecha(fromUnixTime(gasto.data().fecha));
                setDescripcion(gasto.data().descripcion);
                setCantidad(gasto.data().cantidad);
            } else {
                history.push('/lista'); 
            }
       } 
    }, [gasto, usuario, history]);

    const handleChange = (e) => {
        if(e.target.name === 'descripcion'){
            setDescripcion(e.target.value);
        }else if(e.target.name === 'cantidad'){
            setCantidad(e.target.value.replace(/[^0-9]/g, ''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //comprobar si hay descripcion y cantidad
        if(cantidad !== '' && descripcion !== ''){

            if(gasto){
                editarGasto({
                    id: gasto.id,
                    categoria,
                    descripcion,
                    fecha: getUnixTime(fecha),
                    cantidad
                }).then(() => {
                    history.push('/lista');
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                agregarGasto({
                    categoria,
                    descripcion,
                    fecha: getUnixTime(fecha),
                    cantidad,
                    uidUsuario: usuario.uid
                })
                .then(() => {
                    setCategoria('hogar');
                    setCantidad('');
                    setDescripcion('');
                    setFecha(new Date());
    
                    setEstadoAlerta(true);
                    setAlerta({
                        tipo: 'exito',
                        mensaje: 'Gasto agregado correctamente'
                    })
                })
                .catch((error) => {
                    setEstadoAlerta(true);
                    setAlerta({
                        tipo: 'error',
                        mensaje: 'Hubo un problema al agregar el gasto'
                    })
                })
            }

        } else {
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'Rellenar todos los campos'
            });
        }


    }

    return ( 
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias 
                    categoria={categoria}
                    setCategoria={setCategoria}
                />
                <DatePicker 
                    fecha={fecha}
                    setFecha={setFecha}
                />
            </ContenedorFiltros>
            <div>
                <Input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción del Gasto"
                    value={descripcion}
                    onChange={handleChange}
                />
                <InputGrande 
                    type="text"
                    name="cantidad"
                    placeholder="$0 CLP"
                    value={formatearCantidad(cantidad)}
                    onChange={handleChange}
                />

            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono type="submit">
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'}
                    <IconoPLus />
                </Boton>
            </ContenedorBoton>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />
        </Formulario>
     );
}
 
export default FormularioGasto;