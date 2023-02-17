import { useEffect, useState } from "react";
import "../styles/GlobalStyle.css"
import "../styles/UrnaStyle.css"

import logoCemxar from "../util/logo-cemxar.png"
import gif from '../util/libras.gif'
import fotoCandidato from '../util/foto-candidato.png'
import audioDigito from '../util/somDigito.mp3'
import audioUrna from '../util/somUrna.mp3'

import { Link } from "react-router-dom";
import VotoConfirmado from "./Mesario";

function App() {

  const [showUrna, setShowUrna] = useState(false)
  const [showDados, setShowDados] = useState(false)
  const [showBtns, setShowBtns] = useState(false)
  const [showConfirmacaoVoto, setShowConfirmacaoVoto] = useState(false)
  const [showGif, setShowGif] = useState(true)
  const [numeroCandidato, setNumeroCandidato] = useState(null)

  const [horario, setHorario] = useState(null)

  const verificarCandidato = async() =>{

  }

  const numeroCandidatoInput = (e) =>{
    const {value} = e.target;
    setNumeroCandidato(value)
    setShowDados(false)
    setShowGif(false)

    somDigito()
  }

  //Verificar candidatos
  useEffect(() =>{
    if(numeroCandidato == 1){
      setShowDados(true)
      setShowBtns(true)

    }else{
      setShowDados(false)
      setShowGif(true)
      setShowBtns(false)
    } 
  })

  //Botão de confirmar
  const keyEnter = (event) =>{
    if(event.key === 'Enter'){
      let song = new Audio(audioUrna)
      song.play();

      setShowConfirmacaoVoto(true)
      
      setShowDados(false)
      setShowGif(false)
      setShowBtns(false)

      
      setShowUrna(true)
    }
  }

  const somDigito = () =>{
    let song = new Audio(audioDigito)
    song.play()
  }

  return (
    <div className="App">
      <div className="header">
        <img width="100px" src={logoCemxar}></img>
      </div>
      {showUrna ?(
        <div className="eleitor-area">
          <h1 id="tittle">Eleição Grêmio Estudantil - <span><strong>CEMXAR</strong></span></h1>
          <div className="inputDigitoCandidato">
            <input id="digito" autoFocus maxLength="1" onChange={numeroCandidatoInput} onKeyPress={(e) => keyEnter(e)}/>
          </div> 
          {showGif &&(
            <div className="gif">
              <img id="gif" src={gif}></img>
            </div>
          )}

          {showDados &&(
            <div className="dados-candidato">
              <img width="120px" src={fotoCandidato}></img>
              <p>Candidato: <strong>name</strong></p>
              <p>Vice Candidato: <strong>name</strong></p>
              <p>Número: <strong>number</strong></p>
            </div>
            
          )}

          <div className="botoes">
            {showBtns &&(
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
