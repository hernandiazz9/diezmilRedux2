import React, { useState, useEffect } from "react";
import Dado from "./Dado";
import { useDispatch, useSelector } from "react-redux";
import {
  tirarDadosAction,
  guardarDadoAction,
  sumarTresAction,
  sumarEscalera,
  todosDadosSelec,
} from "../redux/nuevoRedux";

const Dice = () => {
  const dispatch = useDispatch();
  const { seTiro, primerTiro, escalera, arrayDadosATirar } = useSelector((state) => state.dados);
  const [dadosTirar, setDadosTirar] = useState([
    ".d1",
    ".d2",
    ".d3",
    ".d4",
    ".d5",
  ]);
  const [arrayDadoSelecValor, setarrayDadoSelecValor] = useState([]);
  const [arrayDadoSelec, setarrayDadoSelec] = useState([]);

  const [valorDadosHTML, setValorDadosHTML] = useState([]);

  const [arrayDadoSelecID, setArrayDadoSelecID] = useState([]);

  function rollDice() {
    setarrayDadoSelec([])
    const arrayDados = [];
    const arrayDadoCreado = [2,2,2,5,3]
    const dice = [...document.querySelectorAll(dadosTirar)];
    dice.forEach((die, i) => {
      toggleClasses(die);
      die.dataset.roll = arrayDadoCreado[i]
      // die.dataset.roll = getRandomNumber(1, 6);
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

  useEffect(() => {//para resaltar dado tocado sumado
    if(arrayDadosATirar.length===0)return;
    const filtrarArrayATirar = valorDadosHTML.filter(dado=>!arrayDadosATirar.includes(dado) );
    const arrayATirar = filtrarArrayATirar.map(dado=>dado.id)
    setDadosTirar(arrayATirar);
  }, [arrayDadosATirar]);
  const onClickDado = (dadoNombre) => {
    const revisarSiRepite = arrayDadoSelec.map(dado=>dado.id===dadoNombre)
    if(revisarSiRepite.includes(true))return console.log('repite');
    const dadoEncontrado = valorDadosHTML.find((dado) => {
      return dado.id === dadoNombre;
    });
    setarrayDadoSelec(arrayDadoSelec => [...arrayDadoSelec, dadoEncontrado]);
  };
  useEffect(() => {
    if(arrayDadoSelec.length===0)return;
    dispatch(guardarDadoAction(arrayDadoSelec));
  }, [arrayDadoSelec]);

  //effect para sumar puntos en escalera

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
        type="button"
        id="roll-button"
        onClick={rollDice}
        disabled={seTiro}
      >
        Roll Dice
      </button>
      {/* tengo que guardar punto */}
      <button type="button">Guardar</button>
    </>
  );
};

export default Dice;
