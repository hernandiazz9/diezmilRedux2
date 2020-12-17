import { firestore} from '../firebase'

//data inicial

const dataInicial = {
    arrayDados:[],
    arrayDadosGuardar:[],
    seTiro:undefined,
    primerTiro:false,
    segundoTiroEnAdelante:false,
    puntajeDeTiro:0,
    jugadores:[],


}

//types
const TIRAR_DADOS = 'TIRAR_DADOS'
const TIRAR_DADOS_MAS_VECES = 'TIRAR_DADOS_MAS_VECES'
const SUMAR_TIRO ='SUMAR_TIRO'
const ARRAY_DADOS='ARRAY_DADOS'
const ARRAY_DADOS_GUARDADOS='ARRAY_DADOS_GUARDADOS'


//reducer
export default function DadosReducer (state = dataInicial, action){
     switch(action.type){
        case ARRAY_DADOS:
            return {...state, arrayDados: action.payload } 
        case TIRAR_DADOS:
             return {...state, seTiro:true, primerTiro:true}
        case ARRAY_DADOS_GUARDADOS:
            return {...state, seTiro:false, arrayDadosGuardar:action.payload }
        case TIRAR_DADOS_MAS_VECES:
            return {...state, segundoTiroEnAdelante:true,  seTiro:false}
        default: 
            return {...state} 
     }
}


//actions
export const tirarDadosAction = (arrayDados, idSala, idJugador) => async (dispatch, getState) => {
    console.log(arrayDados,'action');
    dispatch({
        type:ARRAY_DADOS,
        payload:arrayDados
    })
    dispatch({
        type: TIRAR_DADOS
        })

    /*const {primerTiro} = getState().dados    
    var filtrados;
    var puntos=0;
    var repetidos = {};
    const numOrdenado = arrayDados.sort(function(a, b){return a - b});
    if( numOrdenado[0]===numOrdenado[1]-1&&numOrdenado[1]===numOrdenado[2]-1&&numOrdenado[2]===numOrdenado[3]-1&&numOrdenado[3]===numOrdenado[4]-1&&numOrdenado[4]===numOrdenado[0]+4){
        console.log('escalera');
        return
    }else if(numOrdenado[0]===1&&numOrdenado[1]===3&&numOrdenado[2]===4&&numOrdenado[3]===5&&numOrdenado[4]===6){
        console.log('escalera');
        return
    }
    arrayDados.forEach(x => { repetidos[x] = (repetidos[x] || 0)+1; });
    for (let i = 0; i < Object.values(repetidos).length; i++) {
        
    if(Number(Object.values(repetidos)[i]) === 5){
        console.log('gano');
    }else if (Number(Object.values(repetidos)[i]) >= 3) { 
        if(Object.keys(repetidos)[i]==='1'){
        puntos = Number(Object.keys(repetidos)[i])*1000
        }else{
        puntos = Number(Object.keys(repetidos)[i])*100
        }
        if(Number(Object.values(repetidos)[i])===3){
        filtrados = arrayDados.filter(num=> num!==Number(Object.keys(repetidos)[i])) 
        }else{
        filtrados = arrayDados.filter(num=> num!==Number(Object.keys(repetidos)[i]))
        filtrados.push(Number(Object.keys(repetidos)[i]))
        }
        filtrados.forEach(x => {
        if(x===1){
            puntos+=100;
        }else if(x===5){
            puntos+=50;
        }
        });             
        console.log(puntos);
        //
        if(primerTiro){
            dispatch({
                type:TIRAR_DADOS_MAS_VECES,
            })
        }else {
            dispatch({
                type: TIRAR_DADOS,
                payload: puntos
            })
        }
            return;
        } 
    }
    arrayDados.forEach(x => {
        
        if(x===1){
        puntos+=100;
        }else if(x===5){
        puntos+=50;
        }else return;
    });
    dispatch({
        type: TIRAR_DADOS,
        payload: puntos
    })
    console.log(puntos)*/
    
}

export const guardarDadoAction = (dadoGuardado ) => (dispatch, getState) => {
    const {arrayDadosGuardar} = getState().dados
    arrayDadosGuardar.push(dadoGuardado)
    dispatch({
        type: ARRAY_DADOS_GUARDADOS,
        payload: arrayDadosGuardar
    })
}








// futuro: guardar puntaje en la nube para poder mostrar cuando otro jugador muestra
// al igual que dados. usar num dados para pasar como variable para setear valor de dado