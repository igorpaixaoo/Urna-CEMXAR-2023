import React from "react";

import "../styles/MesarioStyle.css"
import axios from "axios";

const Mesario = () =>{

    const atualizar = () =>{
        alert("Urna liberada com sucesso!")

        axios.put("http://localhost:8080/urna/liberar/1", {
            showUrna: true,
            atualizarPage: true
        })
            .catch(error =>{
                console.log(error)
            })
    }

    return(
        <div className="App">
            <div className="container">
                <div className="mesario">
                    <input id="nome" placeholder="Nome Completo: "/>
                    <button id="btnLiberar" onClick={atualizar}>Liberar</button>
                </div>
            </div>
        </div>
    )
}

export default Mesario;