import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import Close from '../../services/close'
export default function HeaderComponentPostulante(){
    const cerrar = () => {
        new Close();
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="ufps-color" variant="dark">
                <Container>
                        <Navbar.Brand href="/">Convocatorias UFPS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <a href="/Postulante" className="text-sha btn ups-color text-start text-white">Inicio</a>
                                <div onClick={cerrar} className="text-sha btn ups-color text-start text-white">Cerrar Sesion</div>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}