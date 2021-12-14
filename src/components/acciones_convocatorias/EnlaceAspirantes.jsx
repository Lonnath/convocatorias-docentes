import React, { useState, useEffect } from 'react'
export default function EnlaceAspirantes ({data}){

    const takeit = () => {
        sessionStorage.setItem('id_convocatoria', data.id);
        window.location.href="/VerAspirantes";

    }
    
    return (
        <>
            <a href="#" className="btn btn-info w-45" onClick={takeit}>ASPIRANTES</a>
        </>
    );
}