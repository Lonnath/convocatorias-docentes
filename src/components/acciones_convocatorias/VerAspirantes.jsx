import React from "react";
import API from '../../services/Api'
import { MDBDataTableV5 } from 'mdbreact';
import DetallesAspirante from './DetalleAspirante'
export default class VerPostulados extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            admin: props.admin,
            rowsCount : 0,
            datos: {
                columns: [
                    {
                        label: 'DOCUMENTO',
                        field: 'aspirante_documento',
                        width: 100,
                    },
                    {
                        label: 'NOMBRE',
                        field: 'aspirante_nombre',
                        sort: 'asc',
                        width: 100,
                    },
                    {
                        label: 'FECHA DE POSTULACIÓN',
                        field: 'fecha_postulacion',
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
                        label: 'ACCIÓN',
                        field: 'accion',
                        sort: 'disabled',
                        width: 100,
                    },
                    ],
                    rows: [
                   
                ],
            },
            dataTable: {
                columns: [
                    {
                        label: 'DOCUMENTO',
                        field: 'aspirante_documento',
                        width: 100,
                    },
                    {
                        label: 'NOMBRE',
                        field: 'aspirante_nombre',
                        sort: 'asc',
                        width: 100,
                    },
                    {
                        label: 'FECHA DE POSTULACIÓN',
                        field: 'fecha_postulacion',
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
                        label: 'ACCIÓN',
                        field: 'accion',
                        sort: 'disabled',
                        width: 100,
                    },
                    ],
                    rows: [
                    
                ],
            },
        }
        setInterval(() => {
            this.consultar();
            if(this.state.datos.rows.length != this.state.dataTable.rows.length || this.state.dataTable.rows.length==0 ){
                this.setState({dataTable:this.state.datos});
            }
        }, 2000);
    }
    consultar (){
       let datos = {
            id_convocatoria : JSON.parse(sessionStorage.getItem('id_convocatoria'))
        }
       
        API.post('/api/consultar_aspirantes', datos).then(
            response => {
                let out = []; 
                JSON.parse(response.data.DATA).map(item => (
                    out.push({
                        'aspirante_documento': item.aspirante_documento,
                        'aspirante_nombre': item.aspirante_nombre,
                        'fecha_postulacion': item.fecha_postulacion,
                        'estado': item.estado,
                        'accion': <DetallesAspirante data={item}/>
                    })
                ));
                this.setState({
                    datos: {
                        columns: [
                            {
                                label: 'DOCUMENTO',
                                field: 'aspirante_documento',
                                width: 100,
                            },
                            {
                                label: 'NOMBRE',
                                field: 'aspirante_nombre',
                                sort: 'asc',
                                width: 100,
                            },
                            {
                                label: 'FECHA DE POSTULACIÓN',
                                field: 'fecha_postulacion',
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
                                label: 'ACCIÓN',
                                field: 'accion',
                                sort: 'disabled',
                                width: 100,
                            },
                            
                        ],
                        rows: out
                    }
                });
            }
        )
    }
    render(){
        return(
            <>
            
                <div className="mx-5">
                    <h1>
                        Postulaciones
                    </h1>
                    <MDBDataTableV5 hover responsive noRecordsFoundLabel="No se encontraron registros." entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={this.state.dataTable} />
                </div>
            </>
        )
    }
}