import React from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
export default function PostulanteInfo ({data, handleClose}){
    return (
        <>
           
            <Row className="border-bottom">
                <Col>
                    <span className="font-32">
                        Información Convocatoria
                    </span> 
                </Col>
            </Row>
            <Table striped bordered hover size="sm">
                <tbody>
                    <tr>
                        <td><strong>Cargo : </strong></td>
                        <td>XXXXXXXXXX</td>
                    </tr>
                    <tr>
                        <td><strong>Area:  </strong></td>
                        <td>XXXXXXXXXX</td>
                    </tr>
                    <tr>
                        <td><strong>Fecha de Inicio : </strong></td>
                        <td>XXXXXXXXXX</td>
                    </tr>
                    <tr>
                        <td><strong>Fecha de Finalización : </strong></td>
                        <td>XXXXXXXXXX</td>
                    </tr>
                    <tr>
                        <td><strong>Lanzamiento de la convocatoria : </strong></td>
                        <td>XXXXXXXXXX</td>
                    </tr>
                    <tr>
                        <td><strong>Descripción: </strong></td>
                        <td>XXXXXXXXXX</td>
                    </tr>
                    <tr>
                        <td><strong>Estado: </strong></td>
                        <td>XXXXXXXXXX</td>
                    </tr>
                </tbody>
            </Table>
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