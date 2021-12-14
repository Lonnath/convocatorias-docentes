import React from 'react';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import Close from '../../services/close'
import UFPSLogo from '../../images/logoufps.png';
export default function HeaderComponentPostulante(){
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
                                <a href="/Aspirantes" className="text-sha btn ups-color text-start text-white">Inicio</a>
                                <a href="/VerPostulaciones" className="text-sha btn ups-color text-start text-white">Postulaciones</a>
                                <NavDropdown title="Perfil" className="text-white" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/MiPerfilAcademico">Información Academica</NavDropdown.Item>
                                    <NavDropdown.Item href="/MiPerfilProfesional">Información Profesional</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/MiPerfilAspirantes">
                                        Información Personal
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <div onClick={cerrar} className="text-sha btn ups-color text-start text-white">Cerrar Sesion</div>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}