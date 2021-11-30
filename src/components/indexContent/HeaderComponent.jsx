import React, {useState}from 'react';
import { Navbar, Container, Nav, Modal, Button} from 'react-bootstrap';
import Login from '../login/LoginForm.jsx';
export default function HeaderComponent(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                                <a href="/" className="text-sha btn ufps-color text-start text-white">Inicio</a>
                                <a className="text-sha btn ufps-color text-start text-white"  onClick={handleShow}>
                                    Acceso
                                </a>

                                <Modal 
                                 show={show}
                                 onHide={handleClose}
                                 backdrop="static"
                                 keyboard={false}
                                >
                                    <Modal.Header   >
                                        <Modal.Title>Iniciar Sesion</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Login />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cerrar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}