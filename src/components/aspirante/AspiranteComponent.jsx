import React, {useState} from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import AspiranteInfo from './AspiranteInfo';
import AspiranteImg from './AspiranteImg.jsx';
export default function PostulanteComponent ({data}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button variant="outline-success" className="w-100" onClick={handleShow}>
                Detalles
            </Button>
    
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                        <Modal.Title>Detalles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <AspiranteInfo data = {data} handleClose = {handleClose}/>
                            </div>
                        </div>                  
                </Modal.Body>
            </Modal>
        </>
    );
}