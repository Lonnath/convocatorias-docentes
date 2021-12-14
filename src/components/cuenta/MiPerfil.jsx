import React from "react";
import {Row, Col, Button, Form, Alert} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api';
export default class MiPerfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documento: "",
            nombre: "",
            apellidos: "",
            direccion: "",
            telefono: "",
            fecha_nacimiento: "",
            genero: "f",
            email: "",
            alerta : "",
            loading : true,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.consultar();
    }
    consultar(){
        const informacion = {
            user: JSON.parse(sessionStorage.getItem('sesion')).id,
        }
        this.setState({loading:false}); 
        API.post('api/mi_perfil', informacion).then(
                (response) => {
                    const data = JSON.parse(response.data.DATA)[0];
                    this.setState(
                        {
                            documento: data.documento,
                            nombre: data.nombre,
                            apellidos: data.apellidos,
                            direccion: data.direccion,
                            telefono: data.telefono,
                            fecha_nacimiento: data.fecha_nacimiento,
                            genero: data.genero,
                            email: data.email,
                        }
                    );
                }
            )
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        const data = {
            user: JSON.parse(sessionStorage.getItem('sesion')).id,
            documento: this.state.documento,
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,
            direccion: this.state.direccion,
            telefono: this.state.telefono,
            fecha_nacimiento: this.state.fecha_nacimiento,
            genero: this.state.genero,
            email: this.state.email,
        }
        
        this.setState({loading:false});
        API.post('/api/modificar_usuarios', data).then(
                response => this.setState({alerta : <Alert variant={response.data.CODE === 1 ? 
                    "success" : "warning"} className="vanish">{response.data.MESSAGE}</Alert>, loading : true})
        );
        
        event.preventDefault();    
    }
    render() {
        return (
            <div className="w-100 mt-5">
                <div className="mx-auto w-50">
                    <Row className="border-bottom">
                        <Col>
                            <span className="font-32">
                                Datos de usuario
                            </span> 
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mx-1 my-3">
                                    <Form.Label>Documento</Form.Label>
                                    <Form.Control className="form-control" name="documento" value={this.state.documento} onChange={this.handleInputChange} maxLength="50" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Dirección:</Form.Label>
                                    <Form.Control type="text" className="form-control"  name="direccion" value={this.state.direccion} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Nombres:</Form.Label>
                                    <Form.Control type="text" className="form-control"  name="nombre" value={this.state.nombre} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Apellidos:</Form.Label>
                                    <Form.Control type="text" className="form-control"  name="apellidos" value={this.state.apellidos} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Telefono:</Form.Label>
                                    <Form.Control type="number" className="form-control"  name="telefono" value={this.state.telefono} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasicEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" className="form-control"  name="email" value={this.state.email} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Fecha de Nacimiento:</Form.Label>
                                    <Form.Control type="date" className="form-control"  name="fecha_nacimiento" value={this.state.fecha_nacimiento} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mx-1 my-3">
                                    <Form.Label>Genero:</Form.Label>
                                    <Form.Control size="sm" as="select" name="genero" value={this.state.genero} onChange={this.handleInputChange} required>
                                        <option value="m">Masculino</option>
                                        <option value="f">Femenino</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        

                        <div id ="alerta">
                            {
                                this.state.loading ? this.state.alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                            }
                        </div>
                        <div className="d-flex justify-content-end mb-2"> 
                            <a href="/" variant="danger" className="btn btn-danger ">
                                Cancelar
                            </a>
                            <Button variant="success" className="close-button mx-4" type="submit">
                                Modificar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
    