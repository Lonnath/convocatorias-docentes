import React, {useState, useEffect} from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import API from '../../services/Api';
export default function AspiranteExperiencia ({data, handleClose}){
    const [datosUsuario, setDatosUsuario] = useState([]);
    useEffect(() => {
        const datos = {
            user : data.id_aspirante,
        }
        API.post('/api/mis_experiencias', datos).then(
            response => {
                setDatosUsuario(JSON.parse(response.data.DATA));
            }
        )
    })
    return (
        <>
           
            <Row className="border-bottom">
                <Col>
                    <span className="font-32">
                        Experiencias
                    </span> 
                </Col>
            </Row>
            <div className="datos-usuario">
                    
                {
                    datosUsuario.map(item => (
                        <Table responsive className="mb-4">
                            <thead>
                                <th>
                                    Empresa
                                </th>
                                <th>
                                    Cargo
                                </th>
                                <th>
                                    Fecha Ingreso
                                </th>
                                <th>
                                    Fecha Finalización
                                </th>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>{item.empresa}</td>
                                    <td>{item.cargo}</td>
                                    <td>{item.ingreso}</td>
                                    <td>{item.finalizacion}</td>
                                </tr>
                                <tr>
                                    <td colSpan="5">
                                        <strong>Descripcion:</strong>
                                        <br />
                                        {item.descripcion}
                                    </td>
                                </tr>
                            </tbody>
                            
                        </Table>
                        

                    ))
                }
                
            </div>
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