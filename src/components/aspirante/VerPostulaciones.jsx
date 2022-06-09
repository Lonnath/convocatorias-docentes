import React from "react";
import API from '../../services/Api'
import { MDBDataTableV5 } from 'mdbreact';
export default class VerPostulaciones extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rowsCount : 0,
            datos: {
                columns: [
                    {
                        label: 'CARGO - AREA',
                        field: 'cargo_area',
                        width: 100,
                    },
                    {
                        label: 'ESTADO',
                        field: 'estado',
                        width: 100,
                    },
                    {
                        label: 'FECHA PUBLICACIÓN',
                        field: 'fecha_postulacion',
                        width: 100,
                    },
                    {
                        label: 'CALIFICACION',
                        field: 'calificacion',
                        width: 100,
                    },
                ],
                rows: [
                    {
                        cargo_area: '',
                        estado: '',
                        fecha_postulacion: '',
                        calificacion: '',
                    },
                ],
            },
            dataTable: {
                    columns: [
                        {
                            label: 'CARGO - AREA',
                            field: 'cargo_area',
                            width: 100,
                        },
                        {
                            label: 'ESTADO',
                            field: 'estado',
                            width: 100,
                        },
                        {
                            label: 'FECHA PUBLICACIÓN',
                            field: 'fecha_postulacion',
                            width: 100,
                        },
                        {
                            label: 'CALIFICACION',
                            field: 'calificacion',
                            width: 100,
                        },
                    ],
                    rows: [
                        {
                            cargo_area: '',
                            estado: '',
                            fecha_postulacion: '',
                            calificacion: '',
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
       
        API.post('/api/ver_postulacion', datos).then(
            response => {
                let out = []; 
                JSON.parse(response.data.DATA).map(item => (
                    out.push({'cargo_area': item.cargo_area , 'estado':item.estado, 'fecha_postulacion': item.fecha_postulacion, 'calificacion': item.calificacion, })
                ));
                this.setState({
                    datos: {
                        columns: [
                            {
                                label: 'CARGO - AREA',
                                field: 'cargo_area',
                                width: 100,
                            },
                            {
                                label: 'ESTADO',
                                field: 'estado',
                                width: 100,
                            },
                            {
                                label: 'FECHA PUBLICACIÓN',
                                field: 'fecha_postulacion',
                                width: 100,
                            },
                            {
                                label: 'CALIFICACION',
                                field: 'calificacion',
                                width: 100,
                            },
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
                        Postulaciones Realizadas
                    </h1>
                    <MDBDataTableV5 hover responsive noRecordsFoundLabel="No se encontraron registros." entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={this.state.dataTable} />
                </div>
            </>
        )
    }
}