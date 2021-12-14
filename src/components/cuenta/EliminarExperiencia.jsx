import React, {useState, useEffect} from 'react'
import {Button, Alert, Modal} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api'
export default function EliminarExperiencia ({data}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState("");
    const [dato, setDato] = useState(data);
    const eliminar = () => {
        setLoading(false);
        console.log(dato)
        let datos = {
            experiencia : dato.id_experiencia,
        };
        API.post('/api/eliminar_experiencia', datos).then(
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
            <Button className="btn btn-danger danger boton-danger w-100 ms-2" onClick={handleShow} >
                Eliminar
            </Button>
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                        <Modal.Title>Eliminar Estudio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Esta seguro que desea realizar esta acción?, esta acción es irreversible.</p>
                </Modal.Body>
                <div id ="alerta" className="mx-5">
                    {
                        loading ? alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                    }
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button variant="danger" onClick={eliminar}>ELIMINAR</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
  }