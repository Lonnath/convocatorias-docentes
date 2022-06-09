import React from "react";
import File from '../../images/file.png';
import EliminarConvocatoria from "./EliminarConvocatoria";
import EnlaceAspirantes from "./EnlaceAspirantes";
import API from '../../services/Api'
import { MDBDataTableV5 } from 'mdbreact';
import AspiranteComponent from "../aspirante/AspiranteComponent";
import Postular from "../aspirante/Postular";
export default class ListarConvocatorias extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            admin: props.admin,
            rowsCount : 0,
            datos: {
                columns: [
                    {
                        label: 'CARGO - AREA',
                        field: 'cargoyarea',
                        width: 100,
                    },
                    {
                        label: 'INICIO INSCRIPCIÓN',
                        field: 'fecha_inicio_inscripcion',
                        sort: 'asc',
                        width: 100,
                    },
                    {
                        label: 'FIN INSCRIPCIÓN',
                        field: 'fecha_max_inscripcion',
                        sort: 'disabled',
                        width: 150,
                    },
                    {
                        label: 'ESTADO',
                        field: 'estado',
                        sort: 'disabled',
                        width: 100,
                    },
                    {
                        label: 'ARCHIVO',
                        field: 'archivo_id',
                        sort: 'disabled',
                        width: 100,
                    },
                     
                    {
                        label: 'ACCIONES',
                        field: 'acciones',
                        sort: 'disabled',
                        width: 500,
                    }
                    ],
                    rows: [
                    {
                        id: '',
                        cargo:'',
                        area:'',
                        fecha_inicio_inscripcion:'',
                        fecha_max_inscripcion: '',
                        descripcion:'',
                        estado:'',
                        archivo:'',
                    },
                ],
            },
            dataTable: {
                columns: [
                    {
                        label: 'CARGO - AREA',
                        field: 'cargoyarea',
                        width: 100,
                    },
                    {
                        label: 'INICIO INSCRIPCIÓN',
                        field: 'fecha_inicio_inscripcion',
                        sort: 'asc',
                        width: 100,
                    },
                    {
                        label: 'FIN INSCRIPCIÓN',
                        field: 'fecha_max_inscripcion',
                        sort: 'disabled',
                        width: 150,
                    },
                    {
                        label: 'ESTADO',
                        field: 'estado',
                        sort: 'disabled',
                        width: 100,
                    },
                    {
                        label: 'ARCHIVO',
                        field: 'archivo_id',
                        sort: 'disabled',
                        width: 100,
                    },
                     
                    {
                        label: 'ACCIONES',
                        field: 'acciones',
                        sort: 'disabled',
                        width: 500,
                    }
                    ],
                    rows: [
                    {
                        id: '',
                        cargo:'',
                        area:'',
                        fecha_inicio_inscripcion:'',
                        fecha_max_inscripcion: '',
                        descripcion:'',
                        estado:'',
                        archivo:'',
                    },
                ],
            },
        }
        setInterval(() => {
            this.consultar();
            this.setState({dataTable:this.state.datos});
            
        }, 1000);
    }
    consultar (){
        let respuesta = [];
        let datos = {
            user : JSON.parse(sessionStorage.getItem('sesion')).id
        }
       
        API.post('/api/consultar_convocatorias', datos).then(
            response => {
                let out = []; 
                JSON.parse(response.data.DATA).map(item => (
                    out.push({'id':item.id, 'cargoyarea': item.cargo+" - "+item.area , 'fecha_inicio_inscripcion':item.fecha_inicio_inscripcion, 'fecha_max_inscripcion': item.fecha_max_inscripcion, 'descripcion': item.descripcion, 'estado':item.estado, 'archivo_id': <a href={window.location.protocol+'//'+window.location.host+'/static/media/'+item.archivo} alt="" width="30" target='_blank'><img src={File} alt="" width="30"/></a>, 'acciones': this.state.admin ? <div><EnlaceAspirantes data={item} /><EliminarConvocatoria data={item} /></div>: <div><AspiranteComponent data={item} /> <Postular data={item}/></div>})
                ));
                this.setState({
                    datos: {
                        columns: [
                            {
                                label: 'CARGO - AREA',
                                field: 'cargoyarea',
                                width: 100,
                            },
                            {
                                label: 'INICIO INSCRIPCIÓN',
                                field: 'fecha_inicio_inscripcion',
                                sort: 'asc',
                                width: 100,
                            },
                            {
                                label: 'FIN INSCRIPCIÓN',
                                field: 'fecha_max_inscripcion',
                                sort: 'disabled',
                                width: 150,
                            },
                            {
                                label: 'ESTADO',
                                field: 'estado',
                                sort: 'disabled',
                                width: 100,
                            },
                            {
                                label: 'ARCHIVO',
                                field: 'archivo_id',
                                sort: 'disabled',
                                width: 100,
                            },
                                
                            {
                                label: 'ACCIONES',
                                field: 'acciones',
                                sort: 'disabled',
                                width: 500,
                            }
                        ],
                        rows: out
                    }
                });
            }
        )
        return respuesta;
    
    }
    render(){
        return(
            <>
                <div className="mx-5">
                    <h1>
                        Convocatorias {this.state.admin ? "Creadas" : "Disponibles"}
                    </h1>
                    <MDBDataTableV5 hover responsive noRecordsFoundLabel="No se encontraron registros." entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={this.state.dataTable} />
                </div>
            </>
        )
    }
}