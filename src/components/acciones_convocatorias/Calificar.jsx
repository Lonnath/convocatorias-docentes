import React, {useState} from 'react'
import {Button, Alert, Modal} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api'
export default function EliminarEstudio ({data}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState("");
    const [calificacion, setCalificacion] = useState(false);
    const rechazar = () => {
        setCalificacion(false);
    }
    const aprobar = () => {
        setCalificacion(true);
    }
    const calificar = () => {
        setLoading(false);
        let datos = {
            postulacion : data.id_postulacion,
            calificacion : calificacion,
        };
        API.post('/api/calificar_aspirante', datos).then(
            (response) => {
                    setAlerta(<Alert variant={response.data.CODE === 1 ? 
                        "success" : "warning"} className="vanish">{response.data.MESSAGE}</Alert>)
                    setLoading(true)

                    setTimeout(
                        () => {
                            setAlerta("");
                            handleClose();
                        }
                    , 4000);
                
            }
        ) 
    }
    return (
        <>
            <Button className="btn btn-info w-45 ms-2" onClick={handleShow} >
                Calificar
            </Button>
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                        <Modal.Title>Calificar Aspirante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Escoja una opción</p>
                    
                    <Button variant="danger" onClick={rechazar}>Rechazar</Button>

                    <Button variant="info" className="ms-3" onClick={aprobar}>Aprobar</Button>
                </Modal.Body>
                <div id ="alerta" className="mx-5">
                    {
                        loading ? alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                    }
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button variant="success" onClick={calificar}>Calificar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
  }