import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InicioSesion from './components/InicioSesion';
import RegistroUsuarios from './components/RegistroUsuarios';
import GastosCategoria from './components/GastosCategoria';
import ListaGastos from './components/ListaGastos';
import EditarGasto from './components/EditarGasto';
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elements/Fondo';
import { AuthProvider } from './contexts/AuthContext';
import RutaPrivada from './components/RutaPrivada';
import { TotalGastadoProvider } from './contexts/TotalGastadoEnElMesContext';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <> 
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
      </Helmet>
      
      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Switch>
                <Route path="/iniciar-sesion" component={InicioSesion} />
                <Route path="/crear-cuenta" component={RegistroUsuarios} />

                <RutaPrivada path="/categorias">
                  <GastosCategoria />
                </RutaPrivada>
                
                <RutaPrivada path="/lista">
                  <ListaGastos />
                </RutaPrivada>

                <RutaPrivada path="/editar/:id">
                  <EditarGasto />
                </RutaPrivada>

                <RutaPrivada path="/">
                  <App /> 
                </RutaPrivada>

              </Switch>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>

      <Fondo />
    </>
   );
}
 

ReactDOM.render(<Index /> ,document.getElementById('root')
);


