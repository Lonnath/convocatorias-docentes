import React, {useState}from 'react';
import { Navbar, Container, Nav, Modal, Button} from 'react-bootstrap';
export default function HeaderComponent(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="ufps-color" variant="dark">
                <Container>
                        <Navbar.Brand href="/">Convocatorias UFPS</Navbar.Brand>
                        
                </Container>
            </Navbar>
        </>
    )
}