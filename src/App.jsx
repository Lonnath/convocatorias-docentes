import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HeaderComponent from "./components/indexContent/HeaderComponent";
import HeaderComponentAdmin from "./components/admin/HeaderComponentAdmin";
import HeaderComponentPostulante from "./components/postulante/HeaderComponentPostulante";
import IndexContent from './components/indexContent/IndexContent';
import FooterComponent from './components/footercomponent/FooterComponent';
import CrearConvocatoria from "./components/acciones_convocatorias/CrearConvocatoria";
import AdminIndex from "./components/admin/AdminIndex";
import PostulanteIndex from './components/postulante/PostulanteIndex';
import RegistrarUsuario from './components/registrarse/RegistrarUsuario';
import RecuperarCuenta from './components/recuperar_cuenta/RecuperarCuenta';
import VerPostulados from "./components/acciones_convocatorias/VerPostulados";

function App() {
  document.title = 'Inicio'
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Admin">
            <HeaderComponentAdmin />
            <AdminIndex />
          </Route>
          <Route path="/CrearConvocatoria">
            <HeaderComponentAdmin />
            <CrearConvocatoria />
          </Route>
          <Route path="/Postulante">
            <HeaderComponentPostulante />
            <PostulanteIndex />
          </Route>
          <Route path="/CrearConvocatoria">
            <HeaderComponentAdmin />
            <CrearConvocatoria />
          </Route>
          <Route path="/VerPostulados">
            <HeaderComponentAdmin />
            <VerPostulados />
          </Route>
          <Route path="/RegistrarUsuario">
            <HeaderComponent />
            <RegistrarUsuario />
          </Route>
          <Route path="/RecuperarCuenta">
            <HeaderComponent />
            <RecuperarCuenta />
          </Route>
          <Route path="/">
            <HeaderComponent />
            <IndexContent />
          </Route>
      </Switch>
      </Router>
      <div className="mt-5 extra-size"></div>
      <FooterComponent />
    </div>
  );
}

export default App;
