import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HeaderComponent from "./components/indexContent/HeaderComponent";
import HeaderComponentAdmin from "./components/admin/HeaderComponentAdmin";
import HeaderComponentAspirante from "./components/aspirante/HeaderComponentAspirante";
import IndexContent from './components/indexContent/IndexContent';
import FooterComponent from './components/footercomponent/FooterComponent';
import CrearConvocatoria from "./components/acciones_convocatorias/CrearConvocatoria";
import AdminIndex from "./components/admin/AdminIndex";
import AspiranteIndex from './components/aspirante/AspiranteIndex';
import RegistrarUsuario from './components/cuenta/RegistrarUsuario';
import RecuperarCuenta from './components/cuenta/RecuperarCuenta';
import VerAspirantes from "./components/acciones_convocatorias/VerAspirantes";
import MiPerfil from "./components/cuenta/MiPerfil";
import MiPerfilAcademico from "./components/cuenta/MiPerfilAcademico";
import MiPerfilProfesional from "./components/cuenta/MiPerfilProfesional";
import VerPostulaciones from "./components/aspirante/VerPostulaciones";

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
          <Route path="/MiPerfilAdmin">
            <HeaderComponentAdmin />
            <MiPerfil />
          </Route>
          <Route path="/CrearConvocatoria">
            <HeaderComponentAdmin />
            <CrearConvocatoria />
          </Route>
          <Route path="/Aspirantes">
            <HeaderComponentAspirante />
            <AspiranteIndex />
          </Route>
          <Route path="/MiPerfilAspirantes">
            <HeaderComponentAspirante />
            <MiPerfil />
          </Route>
          <Route path="/MiPerfilProfesional">
            <HeaderComponentAspirante />
            <MiPerfilProfesional />
          </Route>
          <Route path="/MiPerfilAcademico">
            <HeaderComponentAspirante />
            <MiPerfilAcademico />
          </Route>
          <Route path="/VerPostulaciones">
            <HeaderComponentAspirante />
            <VerPostulaciones />
          </Route>
          <Route path="/CrearConvocatoria">
            <HeaderComponentAdmin />
            <CrearConvocatoria />
          </Route>
          
          <Route path="/VerAspirantes">
            <HeaderComponentAdmin />
            <VerAspirantes />
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
