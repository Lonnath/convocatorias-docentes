import React from "react";
import ListarConvocatorias from "../acciones_convocatorias/ListarConvocatorias";
export default function PostulanteIndex(){
    return(
        <div>
            <ListarConvocatorias admin={false} />
        </div>
        
    )
}