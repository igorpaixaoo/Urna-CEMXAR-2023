import React from "react";

import "../styles/MesarioStyle.css"

const Mesario = () =>{

    const click = () =>{
        alert("Urna liberada com sucesso!")
    }

    return(
        <div className="App">
            <div className="container">
                <div className="mesario">
                    <input id="nome" placeholder="Nome Completo: "/>
                    <button id="btnLiberar" onClick={click}>Liberar</button>
                </div>
            </div>
        </div>
    )
}

export default Mesario;