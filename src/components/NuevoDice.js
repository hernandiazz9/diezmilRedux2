import React, { useState, useEffect } from "react";
import Dado from "./Dado";
import { useDispatch, useSelector } from "react-redux";
import {
  tirarDadosAction,
  guardarDadoAction,
  seSumaronTodosLosDadosAction,
  sePerdioLaRondaAction,
} from "../redux/nuevoRedux";
import { sumarPuntajeSalaAction } from "../redux/salaRedux";

const Dice = () => {
  const dispatch = useDispatch();
  const {
    seTiro,
    primerTiro,
    arrayDadosATirar,
    sePerdio,
    puntajeDeTiro,
    puntajeRonda,
  } = useSelector((state) => state.dados);
  const { infoSala } = useSelector((store) => store.sala);
  const { user } = useSelector((store) => store.usuario);
  const [dadosTirar, setDadosTirar] = useState([
    ".d1",
    ".d2",
    ".d3",
    ".d4",
    ".d5",
  ]);
  const [arrayDadoSelec, setarrayDadoSelec] = useState([]);
  const [valorDadosHTML, setValorDadosHTML] = useState([]);
  const [jugador, setJugador] = useState({ show: false });

  //tirar dados
  function rollDice() {
    setarrayDadoSelec([]);
    const arrayDados = [];
    // const arrayDadoCreado = [2,1,3,5,5]
    const dice = [...document.querySelectorAll(dadosTirar)];
    dice.forEach((die, i) => {
      toggleClasses(die);
      // die.dataset.roll = arrayDadoCreado[i]
      die.dataset.roll = getRandomNumber(1, 6);
      arrayDados.push(Number(die.dataset.roll));
    });
    setValorDadosHTML(dice);
    dispatch(tirarDadosAction(arrayDados));
  }
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //useEffect para crear el array para el nuevo tiro
  useEffect(() => {
    if (arrayDadosATirar.length === 5) {
      console.log("se seleccionaron todos?");
      dispatch(seSumaronTodosLosDadosAction());
    }
    //para resaltar dado tocado sumado
    console.log(arrayDadosATirar, "array a tirar de action");
    if (arrayDadosATirar.length === 0)
      return setDadosTirar([".d1", ".d2", ".d3", ".d4", ".d5"]);
    // if(!seTiro)return console.log('probando con setiro');
    const filtrarArrayATirar = valorDadosHTML.filter(
      (dado) => !arrayDadosATirar.includes(dado)
    );
    const arrayATirar = filtrarArrayATirar.map((dado) => dado.id);
    setDadosTirar(arrayATirar);
  }, [arrayDadosATirar]);
  //click de cada dado
  const onClickDado = (dadoNombre) => {
    // console.log('-- infoSala', infoSala);
    const revisarSiRepite = arrayDadoSelec.map(
      (dado) => dado.id === dadoNombre
    );
    if (revisarSiRepite.includes(true)) return console.log("repite");
    const dadoEncontrado = valorDadosHTML.find((dado) => {
      return dado.id === dadoNombre;
    });
    setarrayDadoSelec((arrayDadoSelec) => [...arrayDadoSelec, dadoEncontrado]);
  };
  //enviar array dado seleccionado al action
  useEffect(() => {
    if (arrayDadoSelec.length === 0) return;
    dispatch(guardarDadoAction(arrayDadoSelec));
  }, [arrayDadoSelec]);

  useEffect(() => {
    if (puntajeDeTiro === 0 && seTiro) {
      setTimeout(() => {
        dispatch(sePerdioLaRondaAction());
        dispatch(sumarPuntajeSalaAction(user, puntajeRonda));
      }, 3000);
    }
  }, [seTiro]);

  useEffect(() => {
    if (infoSala.player) {
      //if()// poner useffect para controlar cantidad  de render y bloquear el boton de roll cuando no te toca
      const jugador = infoSala.player.filter((jug) => jug.id === user.uid);
      setJugador(jugador[0]);
    }
  }, [infoSala.player]);
  const guardarSiguiente = () => {
    dispatch(sumarPuntajeSalaAction(user, puntajeRonda));
    dispatch(sePerdioLaRondaAction());
  };
  console.log("jugador", jugador);
  return (
    <>
      <div className="dice">
        <div
          className={dadosTirar.includes(".d1") ? "seTiro" : "seGuardo"}
          id="die-1"
        >
          <button
            style={{ background: "none", border: 0 + "px" }}
            type="button"
            disabled={dadosTirar.includes(".d1") && primerTiro ? false : true}
            onClick={() => onClickDado(".d1")}
          >
            <Dado numDado="d1" />
          </button>
        </div>
        <div
          className={dadosTirar.includes(".d2") ? "seTiro" : "seGuardo"}
          id="die-2"
        >
          <button
            style={{ background: "none", border: 0 + "px" }}
            type="button"
            disabled={dadosTirar.includes(".d2") && primerTiro ? false : true}
            onClick={() => onClickDado(".d2")}
          >
            <Dado numDado="d2" />
          </button>
        </div>
        <div
          className={dadosTirar.includes(".d3") ? "seTiro" : "seGuardo"}
          id="die-3"
        >
          <button
            style={{ background: "none", border: 0 + "px" }}
            type="button"
            disabled={dadosTirar.includes(".d3") && primerTiro ? false : true}
            onClick={() => onClickDado(".d3")}
          >
            <Dado numDado="d3" />
          </button>
        </div>
        <div
          className={dadosTirar.includes(".d4") ? "seTiro" : "seGuardo"}
          id="die-4"
        >
          <button
            style={{ background: "none", border: 0 + "px" }}
            type="button"
            disabled={dadosTirar.includes(".d4") && primerTiro ? false : true}
            onClick={() => onClickDado(".d4")}
          >
            <Dado numDado="d4" />
          </button>
        </div>
        <div
          className={dadosTirar.includes(".d5") ? "seTiro" : "seGuardo"}
          id="die-5"
        >
          <button
            style={{ background: "none", border: 0 + "px" }}
            type="button"
            disabled={dadosTirar.includes(".d5") && primerTiro ? false : true}
            onClick={() => onClickDado(".d5")}
          >
            <Dado numDado="d5" />
          </button>
        </div>
      </div>
      <button
        className={
          jugador.show ? "btn mr-2 btn-warning" : "btn btn-secondary mr-2"
        }
        type="button"
        onClick={rollDice}
        disabled={seTiro || !jugador.show}
      >
        Roll Dice
      </button>
      {/* tengo que guardar punto */}
      <button
        className="btn btn-success"
        disabled={!primerTiro}
        onClick={() => guardarSiguiente()}
        type="button"
      >
        {sePerdio ? "Siguiente" : "Guardar"}
      </button>
    </>
  );
};

export default Dice;
