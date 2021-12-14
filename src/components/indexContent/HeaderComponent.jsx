import React, {useState}from 'react';
import { Navbar, Container, Nav, Modal, Button} from 'react-bootstrap';
import UFPSLogo from '../../images/logoufps.png';
export default function HeaderComponent(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                                
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}