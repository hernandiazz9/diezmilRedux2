// import React, { useState, useEffect } from "react";
// import Dado from "./Dado";
// import { useDispatch, useSelector } from "react-redux";
// import { tirarDadosAction,
//   guardarDadoAction,
//   sumarTresAction,
//   sumarEscalera,
//   todosDadosSelec
// } from "../redux/dadosRedux";

// const Dice = () => {
//   const dispatch = useDispatch();
//   const { seTiro,primerTiro, escalera } = useSelector((state) => state.dados);
//   const [dadosTirar, setDadosTirar] = useState([
//     ".d1",
//     ".d2",
//     ".d3",
//     ".d4",
//     ".d5",
//   ]);
//   const [dadosGuardados, setDadosGuardados] = useState([]);
//   const [valorDadosHTML, setValorDadosHTML] = useState([]);
//   const [dadoSeleccionado, setDadoSeleccionado] = useState(null);
//   const [dadoARevisarTres, setDadoARevisarTres] = useState([]);
//   const [controlTocarUnDado, setControlTocarUnDado] = useState([]);

  
  
//   console.log(dadosGuardados,'dadosGuardados');
//   console.log(dadoARevisarTres, 'dadoARevisarTres ');
//   console.log(controlTocarUnDado, 'controlTocarUnDado');
//   console.log(dadosTirar,'dadosTirar');
//   //
//   function rollDice() {
//     setDadoARevisarTres([]);
//     setDadoSeleccionado(null)
//     setControlTocarUnDado([])
//     const arrayDados = [];
//     const dice = [...document.querySelectorAll(dadosTirar)];
//     dice.forEach((die) => {
//       toggleClasses(die);
//       die.dataset.roll = getRandomNumber(1, 6);
//       arrayDados.push(Number(die.dataset.roll));
//     });
//     setValorDadosHTML(dice);
//     dispatch(tirarDadosAction(arrayDados));
//   }
//   function toggleClasses(die) {
//     die.classList.toggle("odd-roll");
//     die.classList.toggle("even-roll");
//   }
//   function getRandomNumber(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
//   useEffect(() => {
//     const dadosATirar = dadosTirar.filter((dado) => {
//       return !dadosGuardados.includes(dado);
//     });
//     setDadosTirar(dadosATirar);
//   }, [dadosGuardados]);

//   const onClickDado = (dadoNombre) => {
//     if (controlTocarUnDado.includes(dadoNombre)) return console.log("incluye");
//     setControlTocarUnDado([...controlTocarUnDado, dadoNombre]);
//     /// boton de tirar dados
//     const dadoEncontrado = valorDadosHTML.find((dado) => {
//       return dado.id === dadoNombre;
//     });
//     setDadoSeleccionado(dadoEncontrado);
//     if (
//       Number(dadoEncontrado.dataset.roll) !== 1 &&
//       Number(dadoEncontrado.dataset.roll) !== 5
//     ) {
//       //cuando no es 1 o 5 , guarda valor para Revisar  si son 3 iguales
//       setDadoARevisarTres([...dadoARevisarTres, dadoEncontrado.dataset.roll]);
//     } else {
//       //envia el valor del dado para realizar calculos de puntaje y para cambiar clase en dado
//       dispatch(guardarDadoAction(dadoEncontrado.dataset.roll));
//       setDadosGuardados([...dadosGuardados, dadoNombre]);
//     }
//   };

//   var tresDadosSeleccionar = {};
//   useEffect(() => {
//     //accion para controlar 3 dados que no sean 1 o 5
//     dadoARevisarTres.forEach((x) => {
//       tresDadosSeleccionar[x] = (tresDadosSeleccionar[x] || 0) + 1;
//     });
//     Object.values(tresDadosSeleccionar).forEach((element) => {
//       if (element === 3) {
//         const BuscarDadosSegunDadoSeleccionado = valorDadosHTML.filter(
//           (dado) => dado.dataset.roll === dadoSeleccionado.dataset.roll
//         );
//         const soloLosTres = BuscarDadosSegunDadoSeleccionado.filter((dado) => {
//           return controlTocarUnDado.includes(dado.id);
//         });
//         var losTres = [];
//         soloLosTres.forEach((dado) => {
//           console.log(dado.id, "dado");
//           losTres.push(dado.id);
//         });
//         console.log(losTres, "lostress");
//         setDadosGuardados(...dadosGuardados, losTres);
//         const uniqueArray = dadosTirar.filter(
//           (value) => losTres.indexOf(value) === -1
//         );
//         setDadosTirar(uniqueArray);
//         dispatch(sumarTresAction(dadoARevisarTres));

//         setDadoARevisarTres([])
//       }
//     });
//   }, [dadoARevisarTres]);
  
// //effect para sumar puntos en escalera
//  useEffect(() => {
//   console.log(dadosTirar,dadosGuardados,' 0, 5 ');
//   if (escalera && controlTocarUnDado.length === 5) {
//     dispatch(sumarEscalera(valorDadosHTML));
//     setControlTocarUnDado([]);
//     setDadosGuardados([])
//     setDadoARevisarTres([])
//     setDadosTirar([]);
//     setTimeout(() => {
//       setDadosTirar([
//         ".d1",
//         ".d2",
//         ".d3",
//         ".d4",
//         ".d5",
//       ])
//     }, 800);
    
//   }else if(dadosTirar.length===0&&dadosGuardados.length===5){
//     console.log(dadosTirar,dadosGuardados,' 0, 5 entrando al elseif');
//     setControlTocarUnDado([]);
//     setDadosGuardados([])
//     setDadoARevisarTres([])
//     dispatch(todosDadosSelec());
//     setTimeout(() => {
//       setDadosTirar([
//         ".d1",
//         ".d2",
//         ".d3",
//         ".d4",
//         ".d5",
//       ])
//     }, 800)}
//  }, [controlTocarUnDado,dadosTirar])
//   return (
//     <>
//       <div className="dice">
//         <div
//           className={dadosTirar.includes(".d1") ? "seTiro" : "seGuardo"}
//           id="die-1"
//         >
//           <button
//             style={{ background: "none", border: 0 + "px" }}
//             type="button"
//             disabled={dadosTirar.includes(".d1")&&primerTiro ? false : true}
//             onClick={() => onClickDado(".d1")}
//           >
//             <Dado numDado="d1" />
//           </button>
//         </div>
//         <div
//           className={dadosTirar.includes(".d2") ? "seTiro" : "seGuardo"}
//           id="die-2"
//         >
//           <button
//             style={{ background: "none", border: 0 + "px" }}
//             type="button"
//             disabled={dadosTirar.includes(".d2")&&primerTiro ? false : true}
//             onClick={() => onClickDado(".d2")}
//           >
//             <Dado numDado="d2" />
//           </button>
//         </div>
//         <div
//           className={dadosTirar.includes(".d3") ? "seTiro" : "seGuardo"}
//           id="die-3"
//         >
//           <button
//             style={{ background: "none", border: 0 + "px" }}
//             type="button"
//             disabled={dadosTirar.includes(".d3")&&primerTiro ? false : true}
//             onClick={() => onClickDado(".d3")}
//           >
//             <Dado numDado="d3" />
//           </button>
//         </div>
//         <div
//           className={dadosTirar.includes(".d4") ? "seTiro" : "seGuardo"}
//           id="die-4"
//         >
//           <button
//             style={{ background: "none", border: 0 + "px" }}
//             type="button"
//             disabled={dadosTirar.includes(".d4")&&primerTiro ? false : true}
//             onClick={() => onClickDado(".d4")}
//           >
//             <Dado numDado="d4" />
//           </button>
//         </div>
//         <div
//           className={dadosTirar.includes(".d5") ? "seTiro" : "seGuardo"}
//           id="die-5"
//         >
//           <button
//             style={{ background: "none", border: 0 + "px" }}
//             type="button"
//             disabled={dadosTirar.includes(".d5")&&primerTiro ? false : true}
//             onClick={() => onClickDado(".d5")}
//           >
//             <Dado numDado="d5" />
//           </button>
//         </div>
//       </div>
//       <button
//         type="button"
//         id="roll-button"
//         onClick={rollDice}
//         disabled={seTiro}
//       >
//         Roll Dice
//       </button>
//       {/* tengo que guardar punto */}
//       <button type="button">Guardar</button>
//     </>
//   );
// };

// export default Dice;
