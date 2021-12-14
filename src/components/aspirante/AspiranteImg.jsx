import React, { useState, useEffect } from 'react';
import { Row, Col, Button} from 'react-bootstrap';
export default function EnlaceAspirantes ({data, handleClose}){

    const takeit = () => {
        sessionStorage.setItem('id_proyecto', data.id);
        window.location.href="/";

    }
    
    return (
        <>
            <Row className="border-bottom">
                <Col>
                    <span className="font-32">
                        Documento Convocatoria
                    </span> 
                </Col>
            </Row>
            
            <a href="#" className="btn btn-info w-50" onClick={takeit}>Soportes</a>
            <Row className="my-5">
                <Col>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="close-button me-4">
                            Cerrar
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}