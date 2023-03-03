import { useEffect, useState } from "react";
import "../styles/GlobalStyle.css"
import "../styles/UrnaStyle.css"

import logoCemxar from "../util/logo-cemxar.png"
import gif from '../util/libras.gif'
import fotoCandidato from '../util/foto-candidato.png'
import audioDigito from '../util/somDigito.mp3'
import audioUrna from '../util/somUrna.mp3'

import axios from "axios";

import VotoConfirmado from "./Mesario";

function App() {

  var [showViewUrna, setShowUrna] = useState(false)
  var [showDados, setShowDados] = useState(false)
  var [showBtns, setShowBtns] = useState(false)
  var [atualizarPage, setAtualizarPage] = useState(null)
  var [showGif, setShowGif] = useState(true)
  var [numeroCandidato, setNumeroCandidato] = useState(null)

  const numeroCandidatoInput = (e) => {
    const { value } = e.target;
    setNumeroCandidato(value)
    setShowDados(false)
    setShowGif(false)

    somDigito()
  }

  //Verificar candidatos
  useEffect(() => {
    axios.get("http://127.0.0.1:8080/urna/liberar/1")
      .then(dados => {
        setShowUrna(dados.data.showUrna)
        setAtualizarPage(dados.data.atualizarPage)
      })
      .catch(error => {
        console.log(error)
      })

    //Atualizar a pagina a cada 1 segundo
    if (showViewUrna == false) {
      if (atualizarPage == false) {
        setTimeout(() => {
          window.location.reload(true)
        }, 1000)
      }
    }

    //verificar candidato
    if (numeroCandidato == 1 || numeroCandidato == 2 || numeroCandidato == 3) {
      setShowDados(true)
      setShowBtns(true)

    } else {
      setShowDados(false)
      setShowGif(true)
      setShowBtns(false)
    }
  })  

  //Botão de confirmar
  const keyEnter = async(event) => {
    if (event.key === 'Enter') {
      let song = new Audio(audioUrna)
      song.play();

      axios.put("http://127.0.0.1:8080/urna/liberar/1", {
        showUrna: false
      })
        .catch(error => {
          console.log(error)
        })

      setShowDados(false)
      setShowGif(false)
      setShowBtns(false)

      setShowUrna(false)
    }
  }

  const somDigito = () => {
    let song = new Audio(audioDigito)
    song.play()
  }

  return (
    <div className="App">
      <div className="header">
        <img width="100px" src={logoCemxar}></img>
      </div>
      {showViewUrna ? (
        <div className="eleitor-area">
          <h1 id="tittle">Eleição Grêmio Estudantil - <span><strong>CEMXAR</strong></span></h1>
          <div className="inputDigitoCandidato">
            <input id="digito" autoFocus maxLength="1" onChange={numeroCandidatoInput} onKeyPress={(e) => keyEnter(e)} />
          </div>

          {showGif && (
            <div className="gif">
              <img id="gif" src={gif}></img>
            </div>
          )}

          {showDados && (
            <div className="dados-candidato">
              <img width="120px" src={fotoCandidato}></img>
              <p>Candidato: <strong>name</strong></p>
              <p>Vice Candidato: <strong>name</strong></p>
              <p>Número: <strong>number</strong></p>
              <div className="informations">
                <p>APERTE A TECLA <span id="cor-verde">VERDE</span> PARA CONFIRMAR O VOTO</p>
                <p>APERTE A TECLA <span id="cor-laranja">LARANJA</span> PARA CORRIGIR O VOTO</p>
              </div>
            </div>
          )}

          <div className="botoes">
            {showBtns && (
              <>
                <button id="btnConfirmar">CONFIRMAR</button>
                <button id="btnCorrige">CORRIGE</button>
              </>
            )}
          </div>

        </div>
      ) : (
        <>
          <h1 id="voto">VOTO CONFIRMADO</h1>
          <h1 id="aguarde">Aguardando liberação...</h1>
        </>

      )}
      <footer className="footer">
        <h1 id="creditos">By Igor</h1>
      </footer>
    </div>
  );
}

export default App;
