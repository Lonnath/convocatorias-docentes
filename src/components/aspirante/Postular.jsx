import React, {useState} from 'react'
import { Table, Button, Modal, Alert } from 'react-bootstrap'
import API from '../../services/Api';
import SpinnerComponent from '../spinner/SpinnerComponent';
export default function Postular ({data}){
    const [show, setShow] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [loading, setLoading] = useState(true);
    const [datos] = useState(data);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const postular = () => {
        const data = {
            user:  JSON.parse(sessionStorage.getItem('sesion')).id,
            convocatoria: datos.id,
        }
        API.post('/api/postular_aspirante', data).then(
            response => {
                setAlerta(<Alert variant={response.data.CODE === 2 ? "warning" : "success"}>{response.data.MESSAGE}</Alert>);
                setLoading(true);
            }    
        );

    }
    return (
        <>
            <Button variant="outline-info" className="w-100" onClick={handleShow}>
                Postularse
            </Button>
    
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                        <Modal.Title>Postulación - {data.estado}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table className="mx-auto w-75">
                        <tbody>
                            <tr>
                                <td><strong>Area - Cargo: </strong></td>
                                <td>{data.area} - {data.cargo}</td>
                            </tr>
                            <tr>
                                <td><strong>Fecha de Inicio: </strong></td>
                                <td>{data.fecha_inicio_inscripcion}</td>
                            </tr>
                            <tr>
                                
                                <td><strong>Fecha de Finalización: </strong></td>
                                <td>{data.fecha_max_inscripcion}</td>
                            </tr>
                            <tr>
                                <td><strong>Lanzamiento de la convocatoria: </strong></td>
                                <td>{data.fecha_creacion}</td>
                            </tr>
                            <tr>
                                <td><strong>Descripción: </strong></td>
                                <td>{data.descripcion}</td>
                            </tr>
                        </tbody>
                    </Table> 
                    <div id ="alerta">
                        {
                            loading ? alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                        }
                    </div>             
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end">
                        <Button variant="info" onClick={postular} className="close-button me-4">
                            Postularse
                        </Button>
                        <Button variant="secondary" onClick={handleClose} className="close-button me-4">
                            Cerrar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}