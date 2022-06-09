import React, {useState} from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import AspiranteDetalle from '../aspirante/AspiranteDetalle';
import AspiranteExperiencias from '../aspirante/AspiranteExperiencias'
import AspiranteEstudios from '../aspirante/AspiranteEstudios';
export default function DetallesAspirante ({data}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
                <Button variant="outline-success" className="w-45" onClick={handleShow}>
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
                        
                        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            
                            </div>
                            <Row>
                                <Col>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Anterior</span>
                                    </button>
                                </Col>
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Siguiente</span>
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <AspiranteDetalle data = {data} handleClose={handleClose}/>
                                </div>
                                <div class="carousel-item">
                                    <AspiranteEstudios data = {data} handleClose={handleClose} />
                                </div>
                                <div class="carousel-item">
                                    <AspiranteExperiencias data = {data} handleClose={handleClose} />
                                </div>
                            </div>
                        </div>                    
                    </Modal.Body>
                </Modal>
            </>
        
    );
}