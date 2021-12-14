import React from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
export default function AspiranteDetalle ({data, handleClose}){
    return (
        <>
           
            <Row className="border-bottom">
                <Col>
                    <span className="font-32">
                        Información Aspirante
                    </span> 
                </Col>
            </Row>
            <Table striped bordered hover size="sm">
                <tbody>
                    <tr>
                        <td><strong>Documento:  </strong></td>
                        <td>{data.aspirante_documento}</td>
                        <td><strong>Nombre Postulante: </strong></td>
                        <td>{data.aspirante_nombre}</td>
                    </tr>
                    <tr>
                        <td><strong>Telefono: </strong></td>
                        <td>{data.telefono}</td>
                        <td><strong>Dirección: </strong></td>
                        <td>{data.direccion}</td>
                    </tr>
                    <tr>
                        <td><strong>Fecha de Postulación: </strong></td>
                        <td>{data.fecha_postulacion}</td>
                        <td><strong>Genero: </strong></td>
                        <td>{data.genero}</td>
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