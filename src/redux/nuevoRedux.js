import { firestore } from "../firebase";

//data inicial

const dataInicial = {
  arrayDados: [],
  arrayDadosGuardar: [],
  arrayDadosATirar: [], // array con dados para tirar
  seTiro: false, // cuando aprieta boton tirar
  primerTiro: false,
  segundoTiroEnAdelante: false,
  puntajeDeTiro: 0,
  jugadores: [],
  puntajeRonda: 0,
  escalera: false,
};
//types
// const TIRAR_DADOS = "TIRAR_DADOS";
// const TIRAR_DADOS_MAS_VECES = "TIRAR_DADOS_MAS_VECES";
// const SUMAR_TIRO = "SUMAR_TIRO";
const ARRAY_DADOS = "ARRAY_DADOS";
const ARRAY_DADOS_GUARDADOS = "ARRAY_DADOS_GUARDADOS";
const GUARDAR_PUNTAJE_TIRO = "GUARDAR_PUNTAJE_TIRO";
const GUARDAR_PUNTAJE_RONDA = "GUARDAR_PUNTAJE_RONDA";
const GUARDAR_PUNTAJE_ESCALERA_TIRO = "GUARDAR_PUNTAJE_ESCALERA_TIRO";
const SUMAR_TIRO_ESCALERA_A_PUNTAJE = "SUMAR_TIRO_ESCALERA_A_PUNTAJE";
const RESET_DADOS_GUARDADOS = "RESET_DADOS_GUARDADOS";
const TODOS_DADOS_SELECCIONADOS = "TODOS_DADOS_SELECCIONADOS";
const ARRAY_DADOS_A_TIRAR = "ARRAY_DADOS_A_TIRAR";

//reducer
export default function DadosReducer(state = dataInicial, action) {
  switch (action.type) {
    case ARRAY_DADOS:
      return {
        ...state,
        arrayDadosGuardar: [],
        primerTiro: true,
        escalera: false,
        // seTiro: true,
        arrayDados: action.payload,
      }; //paso el array dados a el stqate arrayDados
    // case TIRAR_DADOS:
    //   return { ...state, escalera:false, seTiro:true, primerTiro:true };
    case ARRAY_DADOS_GUARDADOS:
      return {
        ...state,
        seTiro: false,
        arrayDadosGuardar: [...state.arrayDadosGuardar, action.payload],
      };
    case GUARDAR_PUNTAJE_TIRO:
      return { ...state, puntajeDeTiro: action.payload };
    case GUARDAR_PUNTAJE_RONDA:
      return { ...state, puntajeRonda: state.puntajeRonda + action.payload };
    case ARRAY_DADOS_A_TIRAR:
      return {
        ...state,
        arrayDadosATirar: [...state.arrayDadosATirar, action.payload],
      };
    case SUMAR_TIRO_ESCALERA_A_PUNTAJE:
      return {
        ...state,
        puntajeRonda: state.puntajeRonda + action.payload.puntos,
        escalera: false,
        arrayDadosATirar: action.payload.arrayDadoSelec,
      };

    case RESET_DADOS_GUARDADOS:
      return { ...state, arrayDadosGuardar: [] };
    case GUARDAR_PUNTAJE_ESCALERA_TIRO:
      return { ...state, puntajeDeTiro: action.payload, escalera: true };

    case TODOS_DADOS_SELECCIONADOS:
      return { ...state, primerTiro: false };
    default:
      return { ...state };
  }
}

//actions
export const tirarDadosAction = (arrayDados) => async (dispatch, getState) => {
  console.log(arrayDados, "action");
  dispatch({
    type: ARRAY_DADOS,
    payload: arrayDados,
  });
  const { seTiro } = getState().dados;

  var filtrados;
  var puntos = 0;
  var repetidos = {};
  const numOrdenado = arrayDados.sort(function (a, b) {
    return a - b;
  });
  if (
    numOrdenado[0] === numOrdenado[1] - 1 &&
    numOrdenado[1] === numOrdenado[2] - 1 &&
    numOrdenado[2] === numOrdenado[3] - 1 &&
    numOrdenado[3] === numOrdenado[4] - 1 &&
    numOrdenado[4] === numOrdenado[0] + 4
  ) {
    dispatch({
      type: GUARDAR_PUNTAJE_ESCALERA_TIRO,
      payload: 500,
    });
    return;
  } else if (
    numOrdenado[0] === 1 &&
    numOrdenado[1] === 3 &&
    numOrdenado[2] === 4 &&
    numOrdenado[3] === 5 &&
    numOrdenado[4] === 6
  ) {
    dispatch({
      type: GUARDAR_PUNTAJE_ESCALERA_TIRO,
      payload: 500,
    });
    return;
  }
  arrayDados.forEach((x) => {
    repetidos[x] = (repetidos[x] || 0) + 1;
  });
  for (let i = 0; i < Object.values(repetidos).length; i++) {
    if (Number(Object.values(repetidos)[i]) === 5) {
      console.log("gano"); // 5 dados iguales
    } else if (Number(Object.values(repetidos)[i]) >= 3) {
      if (Object.keys(repetidos)[i] === "1") {
        puntos = Number(Object.keys(repetidos)[i]) * 1000;
      } else {
        puntos = Number(Object.keys(repetidos)[i]) * 100;
      }
      if (Number(Object.values(repetidos)[i]) === 3) {
        filtrados = arrayDados.filter(
          (num) => num !== Number(Object.keys(repetidos)[i])
        );
      } else {
        filtrados = arrayDados.filter(
          (num) => num !== Number(Object.keys(repetidos)[i])
        );
        filtrados.push(Number(Object.keys(repetidos)[i]));
      }
      filtrados.forEach((x) => {
        if (x === 1) {
          puntos += 100;
        } else if (x === 5) {
          puntos += 50;
        }
      });
      console.log(puntos); // 3 dados iguales + 1 o 5 si aplica
      if (seTiro) {
        // dispatch({
        //   type: TIRAR_DADOS_MAS_VECES,
        // });
      } else {
        dispatch({
          type: GUARDAR_PUNTAJE_TIRO,
          payload: puntos,
        });
      }
      return;
    }
  }
  arrayDados.forEach((x) => {
    if (x === 1) {
      puntos += 100;
    } else if (x === 5) {
      puntos += 50;
    } else return;
  });
  dispatch({
    type: GUARDAR_PUNTAJE_TIRO,
    payload: puntos,
  });
  console.log(puntos);
};

export const guardarDadoAction = (arrayDadoSelec) => (dispatch, getState) => {
  const { escalera, arrayDadosATirar } = getState().dados;
  var punto = 0;
  console.log(arrayDadoSelec, "arrayDadoSelec");

  const calculoPuntaje = (arrayDadosSelec) => {
    // console.log(arrayDadosSelec,'array Dados Selec');

    const sumarPuntos1o5 = (arrayDadosSelec) => {
      const arrayFiltradoSegunPuntajeSumado = arrayDadosSelec.filter(
        (dado) => !arrayDadosATirar.includes(dado)
      );
      console.log(
        arrayFiltradoSegunPuntajeSumado,
        "arrayFiltradoSegunPuntajeSumado"
      );
      arrayFiltradoSegunPuntajeSumado.forEach((x) => {
        if (x.dataset.roll === "1") {
          dispatch({
            type: ARRAY_DADOS_A_TIRAR,
            payload: x,
          });
          punto += 100;
        } else if (x.dataset.roll === "5") {
          dispatch({
            type: ARRAY_DADOS_A_TIRAR,
            payload: x,
          });
          punto += 50;
        }
      });
      dispatch({
        type: GUARDAR_PUNTAJE_RONDA,
        payload: punto,
      });
    };

    sumarPuntos1o5(arrayDadosSelec);
    const arrayOrdenado2 = arrayDadosSelec.sort(
      (a, b) => a.dataset.roll - b.dataset.roll
    ); //ordernar
    console.log(arrayOrdenado2, "arrayOrdenado2");
    if (arrayDadosSelec.length === 5) {
      // comprobar escalera
      // control de escalera revisar..
      if (
        Number(arrayOrdenado2[0].dataset.roll) ===
          Number(arrayOrdenado2[1].dataset.roll) - 1 &&
        Number(arrayOrdenado2[1].dataset.roll) ===
          Number(arrayOrdenado2[2].dataset.roll) - 1 &&
        Number(arrayOrdenado2[2].dataset.roll) ===
          Number(arrayOrdenado2[3].dataset.roll) - 1 &&
        Number(arrayOrdenado2[3].dataset.roll) ===
          Number(arrayOrdenado2[4].dataset.roll) - 1 &&
        Number(arrayOrdenado2[4].dataset.roll) ===
          Number(arrayOrdenado2[0].dataset.roll) + 4
      ) {
        if (escalera) {
          var puntosEscalera = 0;
          arrayOrdenado2.map((dado) => {
            if (dado.dataset.roll === "1") {
              puntosEscalera += 100;
            }
            if (dado.dataset.roll === "5") {
              puntosEscalera += 50;
            }
          });
          console.log(puntosEscalera, "puntosEscalera");
          const puntos = 500 - puntosEscalera;
          console.log(puntos, "puntos");
          dispatch({
            type: SUMAR_TIRO_ESCALERA_A_PUNTAJE,
            payload: { puntos, arrayDadoSelec },
          });
          return;
        }
      } else if (
        Number(arrayOrdenado2.dataset.roll[0]) === 1 &&
        Number(arrayOrdenado2.dataset.roll[1]) === 3 &&
        Number(arrayOrdenado2.dataset.roll[2]) === 4 &&
        Number(arrayOrdenado2.dataset.roll[3]) === 5 &&
        Number(arrayOrdenado2.dataset.roll[4]) === 6
      ) {
        if (escalera) {
          var puntosEscalera = 0;
          arrayOrdenado2.map((dado) => {
            if (dado.dataset.roll === "1") {
              puntosEscalera += 100;
            }
            if (dado.dataset.roll === "5") {
              puntosEscalera += 50;
            }
          });
          console.log(puntosEscalera, "puntosEscalera");
          const puntos = 500 - puntosEscalera;
          console.log(puntos, "puntos");
          dispatch({
            type: SUMAR_TIRO_ESCALERA_A_PUNTAJE,
            payload: { puntos, arrayDadoSelec },
          });
          return;
        }
      }
    }
    const dadosRepetidos = [];
    const arrayFiltrado = arrayDadosSelec.filter(
      (dado) => !arrayDadosATirar.includes(dado)
    );
    const arrayOrdenado = arrayFiltrado.sort(
      (a, b) => a.dataset.roll - b.dataset.roll
    ); //ordernar
    // console.log(arrayOrdenado,'arrayOrdenado');
    // const orden = arrayOrdenado.reduce ((unique, item) =>  unique.includes (item) ? unique : [...unique, item], [])
    // console.log(orden);
    var controlBuscarTres;
    if (arrayDadoSelec.length >= 3 && arrayDadoSelec.length <= 5) {
      //buscar 3 iguales
      controlBuscarTres = arrayOrdenado.length - 2;
      if (arrayDadoSelec.length === 5) {
        controlBuscarTres = 3;
      }
      for (let i = 0; i < controlBuscarTres; i++) {
        if (
          arrayOrdenado[i + 1].dataset.roll &&
          arrayOrdenado[i + 2].dataset.roll === arrayOrdenado[i].dataset.roll
        ) {
          dadosRepetidos.push(
            arrayOrdenado[i],
            arrayOrdenado[i + 1],
            arrayOrdenado[i + 2]
          );
          dadosRepetidos.forEach((dado) => {
            dispatch({
              type: ARRAY_DADOS_A_TIRAR,
              payload: dado,
            });
          });
          punto += Number(dadosRepetidos[0].dataset.roll) * 100;
          dispatch({
            type: GUARDAR_PUNTAJE_RONDA,
            payload: punto,
          });
          return;
        }
      }
    }

    console.log(arrayDadosSelec, "array Dados de afuera");
    const controlTresDadosUno = arrayDadosSelec.filter(
      // sumar para llegar mil al sacar 1000
      (dado) => dado.dataset.roll === "1"
    );
    // console.log(controlTresDadosUno, "control T res Dados Uno");
    if (controlTresDadosUno.length === 3) {
      punto += 700;
      return dispatch({
        type: GUARDAR_PUNTAJE_RONDA,
        payload: punto,
      });
    }
    const controlTresDadosCinco = arrayDadosSelec.filter(
      // sumar para llegar 500 al sacar 500
      (dado) => dado.dataset.roll === "5"
    );
    if (controlTresDadosCinco.length === 3) {
      punto += 350;
      return dispatch({
        type: GUARDAR_PUNTAJE_RONDA,
        payload: punto,
      });
    }
    //arrayDado seleccionado si es 1 o 5 guardar puntaje ronda
    
  };
  calculoPuntaje(arrayDadoSelec);
};
export const sumarTresAction = (tresDados) => (dispatch) => {
  const valor = Number(tresDados[0]) * 100;
  // dispatch({
  //   type: SUMAR_TIRO,
  //   payload: valor,
  // });
};
export const sumarEscalera = (arrayEscalera) => (dispatch) => {
  var pts = 500;
  arrayEscalera.forEach((dado) => {
    if (Number(dado.dataset.roll) === 5) {
      pts -= 50;
    } else if (Number(dado.dataset.roll) === 1) {
      pts -= 100;
    }
  });
  console.log(pts, "pts");
  dispatch({
    type: SUMAR_TIRO_ESCALERA_A_PUNTAJE,
    payload: pts,
  });
};
export const todosDadosSelec = () => (dispatch) => {
  dispatch({
    type: TODOS_DADOS_SELECCIONADOS,
  });
};

// futuro: guardar puntaje en la nube para poder mostrar cuando otro jugador muestra
// al igual que dados. usar num dados para pasar como variable para setear valor de dado
//tomar los puntos y mandarlos al acumulador de puntos del tiro y del juego pensar en esa parte, primero del tiro
