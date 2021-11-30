import React, { useState, useEffect } from 'react'
export default function EnlaceAspirantes ({data}){

    const takeit = () => {
        sessionStorage.setItem('id_proyecto', data.id);
        window.location.href="/";

    }
    
    return (
        <>
            <a href="#" className="btn btn-info w-50" onClick={takeit}>Soportes</a>
        </>
    );
}