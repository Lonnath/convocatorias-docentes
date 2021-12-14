import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import Close from '../../services/close'
import UFPSLogo from '../../images/logoufps.png';
export default function HeaderComponentAdmin(){
    const cerrar = () => {
        new Close();
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="ufps-color" variant="dark">
                <Container>
                        <img src={UFPSLogo} alt="Logo UFPS"  width="60" height="60"/>
                        <Navbar.Brand href="/" className="ms-4">Convocatorias UFPS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <a href="/Admin" className="text-sha btn ufps-color text-start text-white">Inicio</a>
                                <a href="/CrearConvocatoria" className="text-sha btn ufps-color text-start text-white">Crear Convocatoria</a>
                                <a href="/MiPerfilAdmin" className="text-sha btn ufps-color text-start text-white">Perfil</a>
                                <div onClick={cerrar} className="text-sha btn ufps-color text-start text-white">Cerrar Sesion</div>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}