import React, { useState, useEffect } from 'react'
export default function EnlaceEvaluaciones ({data}){

    const takeit = () => {
        sessionStorage.setItem('id_proyecto', data.id);
        window.location.href="/VerPostulados";

    }
    
    return (
        <>
            <a href="#" className="btn btn-info w-50" onClick={takeit}>ASPIRANTES</a>
        </>
    );
}