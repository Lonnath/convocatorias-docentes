import React from "react";
import ListarConvocatorias from "../acciones_convocatorias/ListarConvocatorias";
export default function AdminIndex(){
    return(
        <>
            <ListarConvocatorias admin ={true} />
        </>
    );
}