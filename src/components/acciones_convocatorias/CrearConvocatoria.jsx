import React from "react";
import {Button, Form, Alert, Row, Col} from 'react-bootstrap';
import SpinnerComponent from '../spinner/SpinnerComponent.jsx';
import API from '../../services/Api'
export default class CrearConvocatoria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cargo: "",
            area: "",
            fecha_inicio_inscripcion: "",
            fecha_max_inscripcion: "",
            descripcion: "",
            archivo: "",
            alert : "",
            loading : true,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            cargo: this.state.cargo,
            area: this.state.area,
            fecha_inicio_inscripcion: this.state.fecha_inicio_inscripcion,
            fecha_max_inscripcion: this.state.fecha_max_inscripcion,
            descripcion: this.state.descripcion,
            archivo: this.state.archivo,
        }
        this.setState({loading:false}); 
        API.post('/api/crear_convocatoria', data).then(
                response => this.setState({alerta : <Alert variant={response.data.CODE === 1 ? 
                    "success" : "warning"} className="vanish">{response.data.MESSAGE}</Alert>, loading : true})
            ) 
        
        
        event.preventDefault(); 
    }
    render() {
      return (
        <div className="d-block w-50 mx-auto">
            <Row className="border-bottom">
                <Col>
                    <span className="font-32">
                        Crear Convocatoria
                    </span> 
                </Col>
            </Row>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Cargo:</Form.Label>
                    <Form.Control type="text" className="form-control"  name="cargo" value={this.state.cargo} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Area:</Form.Label>
                    <Form.Control type="text" className="form-control"  name="area" value={this.state.area} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Fecha de Inicio Inscripción:</Form.Label>
                    <Form.Control type="date" className="form-control"  name="fecha_inicio_inscripcion" value={this.state.fecha_inicio_inscripcion} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Fecha Maxima de Inscripción:</Form.Label>
                    <Form.Control type="date" className="form-control"  name="fecha_max_inscripcion" value={this.state.fecha_max_inscripcion} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group className="mx-1 my-3">
                    <Form.Label>Descripción: </Form.Label>
                    <Form.Control type="text" className="form-control"  name="descripcion" value={this.state.descripcion} onChange={this.handleInputChange} maxLength="100" required/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Soportes: </Form.Label>
                    <Form.Control type="file" name="archivo" value={this.state.archivo} onChange={this.handleInputChange} />
                </Form.Group>
                
                <div id ="alerta">
                    {
                        this.state.loading ? this.state.alerta : <div class="d-flex justify-content-center mb-2"><SpinnerComponent /></div>
                    }
                </div>
                <div className="d-flex justify-content-end mb-2"> 
                    <Button variant="success mx-2" className="close-button" type="submit">
                        Crear
                    </Button>
                </div>
            </Form>
        </div>
      );
    }
  }