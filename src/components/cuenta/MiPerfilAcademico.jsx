import React from "react";
import {Row, Col, Button, Form, Alert, Table} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api';
import EliminarEstudio from "./EliminarEstudio.jsx";
export default class MiPerfilAcademico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            institucion:"",
            titulo:"",
            fecha_ingreso:"",
            fecha_finalizacion:"",
            actual:false,
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
        API.post('api/mis_estudios', informacion).then(
                (response) => {
                    this.setState(
                        {
                            data: JSON.parse(response.data.DATA),
                        }
                    );
                }
            )
    }
    componentDidUpdate(){
        this.consultar();
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
            institucion: this.state.institucion,
            titulo:this.state.titulo,
            fecha_ingreso:this.state.fecha_ingreso,
            fecha_finalizacion:this.state.fecha_finalizacion,
            actual:this.state.actual,
        }
        
        this.setState({loading:false});
        API.post('/api/estudios_usuarios', data).then(
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
                                Estudios
                            </span> 
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        
                        <Row>
                            <Col>
                                <Form.Group className="mx-1 my-3">
                                    <Form.Label>Nombre Institución:</Form.Label>
                                    <Form.Control type="text" className="form-control" name="institucion" value={this.state.institucion} onChange={this.handleInputChange} maxLength="50" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Titulo Obtenido:</Form.Label>
                                    <Form.Control type="text" className="form-control"  name="titulo" value={this.state.titulo} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Fecha Ingreso:</Form.Label>
                                    <Form.Control type="date" className="form-control"  name="fecha_ingreso" value={this.state.fecha_ingreso} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <Form.Label>Fecha Finalización:</Form.Label>
                                    <Form.Control type="date" className="form-control"  name="fecha_finalizacion" value={this.state.fecha_finalizacion} onChange={this.handleInputChange} maxLength="100" required/>
                                </Form.Group>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mx-1 my-3" controlId="formBasic">
                                    <label>Estudio en Proceso:</label>
                                    <div className="mx-4">
                                        
                                        <input type="checkbox" className="form-check-input" name="actual" value={this.state.actual} onChange={this.handleInputChange}/>
                                        
                                    </div>
                                </Form.Group>
                            </Col>
                            
                        </Row>
                        <div id ="alerta">
                            {
                                this.state.loading ? this.state.alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                            }
                        </div>
                        <div className="d-flex justify-content-end mb-2"> 
                            <Button variant="success" className="close-button mx-4" type="submit">
                                Insertar
                            </Button>
                        </div>
                    </Form>
                        
                </div>
                <div className="w-75 mx-auto mt-3">
                    {
                        this.state.data.map(item => (
                            <Table responsive className="mb-4">
                                <thead>
                                    <th>
                                        Institución
                                    </th>
                                    <th>
                                        Titulo Obtenido
                                    </th>
                                    <th>
                                        Fecha Ingreso
                                    </th>
                                    <th>
                                        Fecha Finalización
                                    </th>
                                    <th>
                                        ACCION
                                    </th>
                                </thead>
                                <tr >
                                    <td>{item.institucion}</td>
                                    <td>{item.titulo}</td>
                                    <td>{item.ingreso}</td>
                                    <td>{item.finalizacion}</td>
                                    <td>
                                        <EliminarEstudio data={item} />
                                    </td>
                                </tr>
                            </Table>
                            

                        ))
                    }
                </div>
            </div>
        );
    }
}
    