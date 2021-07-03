import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elements/Header';
import Boton from './../elements/Boton';
import { 
    Formulario, 
    Input, 
    ContenedorBoton } from './../elements/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/login.svg';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import Alerta from '../elements/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.25rem; /* 200px*/
    margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {

    const history = useHistory();
    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setCorreo(e.target.value);
        } else if(e.target.name === 'password'){
            setPass(e.target.value);
        }
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();
        setEstadoAlerta(false);
        setAlerta({});

        //Comprobar e correo valido
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)){
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor ingresa correo valido'
            });
            return;
        }

        if(correo === '' || pass === ''){
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'Completar todos los campos'
            });
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(correo, pass);
            history.push('/');
        } catch (error) {
            setEstadoAlerta(true);
            let mensaje;

            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No se encontro una cuenta con ese correo electrónico.'
                    break;    
                default :
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;            
            }

            setAlerta({
                tipo: 'error',
                mensaje
            });
        }
           
        
    }

    return ( 
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to="/crear-cuenta" >Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input 
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    value={correo}
                    onChange={handleChange}
                />
                <Input 
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={pass}
                    onChange={handleChange}
                />

                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar Sesion</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}
            />
        </>
     );
}
 
export default InicioSesion;