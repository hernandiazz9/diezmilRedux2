import { firestore } from "../firebase";

//data inicial

const dataInicial = {
  arrayDados: [],
  arrayDadosATirar: [], // array con dados para tirar
  seTiro: false, // cuando aprieta boton tirar
  primerTiro: false, //checkear o sacar
  puntajeDeTiro: 0,
  puntajeRonda: 0,
  escalera: false,
  seSumo1o5: false,
  sePerdio: false,
};
//types

const ARRAY_DADOS = "ARRAY_DADOS";
const GUARDAR_PUNTAJE_TIRO = "GUARDAR_PUNTAJE_TIRO";
const GUARDAR_PUNTAJE_RONDA = "GUARDAR_PUNTAJE_RONDA";
const GUARDAR_PUNTAJE_ESCALERA_TIRO = "GUARDAR_PUNTAJE_ESCALERA_TIRO";
const SUMAR_TIRO_ESCALERA_A_PUNTAJE = "SUMAR_TIRO_ESCALERA_A_PUNTAJE";
const SE_SUMO_1_O_5 = "SE_SUMO_1_O_5";
const ARRAY_DADOS_A_TIRAR = "ARRAY_DADOS_A_TIRAR";
const SE_SUMO_TODOS_DADOS = "SE_SUMO_TODOS_DADOS";
const SE_PERDIO_RONDA = "SE_PERDIO_RONDA";

//reducer
export default function DadosReducer(state = dataInicial, action) {
  switch (action.type) {
    case ARRAY_DADOS:
      return {
        ...state,
        primerTiro: true,
        escalera: false,
        seSumo1o5: false,
        seTiro: true,
        arrayDados: action.payload,
      };
    case GUARDAR_PUNTAJE_TIRO:
      return { ...state, puntajeDeTiro: action.payload };
    case GUARDAR_PUNTAJE_RONDA:
      return { ...state, puntajeRonda: state.puntajeRonda + action.payload };
    case ARRAY_DADOS_A_TIRAR:
      return {
        ...state,
        arrayDadosATirar: [...state.arrayDadosATirar, action.payload],
        seTiro: false,
      };
    case SUMAR_TIRO_ESCALERA_A_PUNTAJE:
      return {
        ...state,
        puntajeRonda: state.puntajeRonda + action.payload.puntos,
        escalera: false,
        arrayDadosATirar: action.payload.arrayDadoSelec,
      };
    case SE_SUMO_1_O_5:
      return { ...state, seSumo1o5: true };

    case SE_SUMO_TODOS_DADOS:
      return { ...state, arrayDadosATirar: [] };
    case SE_PERDIO_RONDA:
      return { ...dataInicial };

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

      dispatch({
        type: GUARDAR_PUNTAJE_TIRO,
        payload: puntos,
      });

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
  const { escalera, arrayDadosATirar, seSumo1o5 } = getState().dados;
  var punto = 0;

  const calculoPuntaje = (arrayDadosSelec) => {
    // console.log(arrayDadosSelec,'array Dados Selec');
    const sumarPuntos1o5 = (arrayDadosSelec) => {
      // sumo puntos 1 o 5
      const arrayFiltradoSegunPuntajeSumado = arrayDadosSelec.filter(
        //filtar array sacando 1 o 5 ya sumado
        (dado) => !arrayDadosATirar.includes(dado)
      );
      console.log(
        arrayFiltradoSegunPuntajeSumado,
        "arrayFiltradoSegunPuntajeSumado"
      );
      arrayFiltradoSegunPuntajeSumado.forEach((dado) => {
        if (dado.dataset.roll === "1") {
          //sumo 100 por cada 1 del array dado seleccinado
          dispatch({
            type: ARRAY_DADOS_A_TIRAR,
            payload: dado,
          });
          punto = 100;
        } else if (dado.dataset.roll === "5") {
          //sumo 50 por cada 5 del array dado seleccinado
          dispatch({
            type: ARRAY_DADOS_A_TIRAR,
            payload: dado,
          });
          punto = 50;
        }
        console.log(punto, "sumo ");
        dispatch({
          type: GUARDAR_PUNTAJE_RONDA,
          payload: punto,
        });
      });
    };
    sumarPuntos1o5(arrayDadosSelec);

    const checkEscalera = () => {
      if (arrayDadosSelec.length === 5) {
        //comprobar escalera
        const arrayOrdenado2 = arrayDadosSelec.sort(
          (a, b) => a.dataset.roll - b.dataset.roll
        ); //ordernar
        // console.log(arrayOrdenado2, "arrayOrdenado2");

        // comprobar escalera
        // control de escalera revisar..
        if (escalera) {
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
        } else if (escalera) {
          if (
            Number(arrayOrdenado2.dataset.roll[0]) === 1 &&
            Number(arrayOrdenado2.dataset.roll[1]) === 3 &&
            Number(arrayOrdenado2.dataset.roll[2]) === 4 &&
            Number(arrayOrdenado2.dataset.roll[3]) === 5 &&
            Number(arrayOrdenado2.dataset.roll[4]) === 6
          ) {
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
    };
    checkEscalera();

    //control 3 dados iguales no 1 no 5
    const check3DadosNo1No5 = () => {
      const dadosRepetidos = [];
      var controlBuscarTres;
      if (arrayDadoSelec.length >= 3 && arrayDadoSelec.length <= 5) {
        const arrayFiltrado = arrayDadosSelec.filter(
          (dado) => !arrayDadosATirar.includes(dado)
        );
        const arrayOrdenado = arrayFiltrado.sort(
          (a, b) => a.dataset.roll - b.dataset.roll
        ); //ordernar
        // buscar 3 que no sea uno o 5
        //buscar 3 iguales
        if (arrayFiltrado.length < 3) return console.log("son menor a 3");
        controlBuscarTres = arrayOrdenado.length - 2;
        if (arrayDadoSelec.length === 5) {
          controlBuscarTres = 3;
        }
        console.log(
          arrayOrdenado,
          "arrayOrdenado  antres de entrar a control 3 iguales"
        );
        for (let i = 0; i < controlBuscarTres; i++) {
          if (arrayOrdenado.length < 3) return;
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
            console.log(punto, "punto que sumo cuando son 3 iguales no 1 no 5");
            dispatch({
              type: GUARDAR_PUNTAJE_RONDA,
              payload: punto,
            });
            return;
          }
        }
      }
      console.log(arrayDadosSelec, "array Dados de afuera");
      console.log(punto, "punto");
    };
    check3DadosNo1No5();

    const check3Dados1o5 = () => {
      const controlTresDadosUno = arrayDadosSelec.filter(
        // sumar para llegar mil al sacar 1000
        (dado) => dado.dataset.roll === "1"
      );
      // console.log(controlTresDadosUno, "control T res Dados Uno");
      if (controlTresDadosUno.length === 3) {
        console.log(seSumo1o5, "true  si ya se sumo");
        if (seSumo1o5) return;
        punto = 700;
        console.log(punto, "sumo 700 puntos para completar los 1000 con 3 1");
        dispatch({
          type: SE_SUMO_1_O_5,
        });
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
        if (seSumo1o5) return;
        punto = 350;
        console.log(punto, "sumo 300 puntos para completar los 500 con 3 5");
        dispatch({
          type: SE_SUMO_1_O_5,
        });
        return dispatch({
          type: GUARDAR_PUNTAJE_RONDA,
          payload: punto,
        });
      }
      //arrayDado seleccionado si es 1 o 5 guardar puntaje ronda
    };
    check3Dados1o5();
  };
  calculoPuntaje(arrayDadoSelec);
};

export const seSumaronTodosLosDadosAction = () => (dispatch, getState) => {
  dispatch({
    type: SE_SUMO_TODOS_DADOS,
  });
};
export const sePerdioLaRondaAction = () => (dispatch, getState) => {
  // const {arrayDadosATirar}= getState().dados
  dispatch({
    type: SE_PERDIO_RONDA,
  });
};

// futuro: guardar puntaje en la nube para poder mostrar cuando otro jugador muestra
// al igual que dados. usar num dados para pasar como variable para setear valor de dado
//tomar los puntos y mandarlos al acumulador de puntos del tiro y del juego pensar en esa parte, primero del tiro
