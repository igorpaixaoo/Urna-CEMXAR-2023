import React, { useState } from "react";

import "../styles/MesarioStyle.css"
import axios from "axios";

import somDigito from "../util/somDigito.mp3"

const Mesario = () => {

    var [showUrnaLiberada, setShowUrnaLiberada] = useState(false);
    var [nome, setNome] = useState("")

    const atualizar = async() => {

        setShowUrnaLiberada(true)

        axios.put("http://127.0.0.1:8080/urna/liberar/1", {
            showUrna: true,
            atualizarPage: true
        })
            .catch(error => {
                console.log(error)
            })

        setNome("")
        let som = new Audio(somDigito);
        som.play();
    }

    const input = (e) =>{
        const {value} = e.target

        setNome(value)

        if(value == ""){
            setShowUrnaLiberada(false)
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="mesario">
                    <input id="nome" placeholder="Nome Completo: " onChange={input}/>
                    <button id="btnLiberar" onClick={atualizar}>Liberar</button>

                    {showUrnaLiberada &&(
                        <p id="urna-liberada-sucesso">Urna liberada com sucesso!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Mesario;