import {firestore} from '../firebase'
import shortid from 'shortid'

//constantes
const dataInicial ={
    infoSala : {roomName:''},
    idSala:'',
    loading2:false,
    haySala:false,
    salaError: false
}
// currentTurn: 1
// player: Array(2)
// 0: {totalScore: 0, id: "qEAoBMGUnAVeh0ipXfolupDlM033", show: true, turn: 1, playerName: "Guille Tempo"}
// 1: {show: false, playerName: "Hernán Díaz Daives", totalScore: 250, id: "QypgMJ9eKOTQ9d2NnWWdndMHPoq1", turn: 2}
// length: 2
// roomName: "HH"

// id: "qEAoBMGUnAVeh0ipXfolupDlM033"
// playerName: "Guille Tempo"
// show: true
// totalScore: 0
// turn: 1
//types
const LOADING_2 = 'LOADING_2'
const CREAR_SALA = 'CREAR_SALA'
const MODIFICAR_NUMERO = 'MODIFICAR_NUMERO'
const LEER_SALA = 'LEER_SALA'
const LEER_CONTENIDO_SALA = 'LEER_CONTENIDO_SALA'
const UNIR_SALA = 'UNIR_SALA'
const SALIR_SALA = 'SALIR_SALA'
const SALA_ERROR = 'SALA_ERROR'



//reducer
export default function salaReducer( state = dataInicial, action){
    switch (action.type) {
        case LOADING_2:
            return { ...state,loading2:true}
        case CREAR_SALA:
            return { ...state,loading2:false, haySala:true, idSala: action.payload }
            case MODIFICAR_NUMERO:
                return{...state } 
        case LEER_SALA: 
        case UNIR_SALA:
            return {...state , loading2:false, idSala:action.payload, haySala:true,  }
        case LEER_CONTENIDO_SALA:
            return {...state, infoSala: action.payload }
        case SALIR_SALA:
            return{...dataInicial}
        case SALA_ERROR :
                return {...state, loading2:false, salaError:true}
        default:
            return state
    }
}

//action
export const crearSalaAction = ( nombreSala, user ) => async (dispatch) => {
    dispatch({
        type: LOADING_2
    })
    console.log(user);
    try {
        const sala = {
            currentTurn:1,
            roomName:nombreSala,
            player:[{
                id:user.uid,
                playerName:user.nombre,
                turn:1,
                show:true,
                totalScore:0
                }]
        }
        await firestore.collection('diezmil').add(sala).then((docRef)=>{
            dispatch({
                type: CREAR_SALA,
                payload: docRef.id
            })
            localStorage.setItem('idSala', docRef.id)
        })
    } catch (error) { console.log(error) }
}

export const leerSalaAction = () => async (dispatch, getState) => {
    //const idSala  = getState().sala.nombreSala
    if(localStorage.getItem('idSala')){
        const idSala = localStorage.getItem('idSala')
        dispatch({
            type:LEER_SALA,
            payload: idSala
        })
        try { 
                  firestore.collection('diezmil').doc(idSala).onSnapshot((snapshot)=>{
                    const jugadores = snapshot.data()
                    dispatch({
                        type:LEER_CONTENIDO_SALA,
                        payload:jugadores
                    })
                    console.log('jugadores',jugadores)
                })

        } catch (error) { console.log(error) }
    }
    
}

export const unirSalaAction = (nombreSala, user) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_2
    })
    try {
        const salaRef = firestore.collection('diezmil')
        const existeSala =  salaRef.where('roomName','==',nombreSala);
        existeSala.get().then((docRef)=>{
            if(docRef.empty){
                dispatch({
                    type: SALA_ERROR
                })
                console.log('no existe la sala');
                setTimeout(() => {
                    dispatch({
                        type: SALIR_SALA
                    })
                }, 3000);
            }else{
                 firestore.collection('diezmil').doc(docRef.docs[0].id).get()
                .then(function(doc){
                    //console.log(doc.data().player.length); 
                    const cantidadJugadores = doc.data().player.length;
                    const newPlayer ={
                        id:user.uid,
                        playerName:user.nombre,
                        turn:cantidadJugadores + 1,
                        show:false,
                        totalScore:0
                    }
                    // const player =doc.data().player.map((player)=>{return player})
                    const player = [...doc.data().player]
                    player.push(newPlayer)
                    // console.log(player);
                    firestore.collection('diezmil').doc(docRef.docs[0].id).set({
                        player: player
                    }, { merge: true });
                    localStorage.setItem('idSala', docRef.docs[0].id)
                    dispatch({
                        type: UNIR_SALA,    
                        payload :docRef.docs[0].id
                    })
                })
            }
        })
    } catch (error) { console.log(error) }
}

export const salirSalaAction = (idSala, name) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_2
    })
    const {player} = getState().sala.infoSala
    console.log('player', player);
    if(!player)return null
    const playerFiltrado = player.filter(jugador => jugador.playerName !== name )
    const newPlayer = playerFiltrado.map((jugador,i)=>{
        jugador.turn = i + 1
        return jugador
    })
    console.log('newPlayer',newPlayer);
    try {
        localStorage.removeItem('idSala')
        await firestore.collection('diezmil').doc(idSala).set({
            player: newPlayer
        }, { merge: true });   
        dispatch({
            type: SALIR_SALA
        })
    } catch (error) { console.log(error) }
    
}


export const sumarPuntajeSalaAction = ( user, puntajeGuardar ) => async (dispatch, getState) => {

        const { player, currentTurn } = getState().sala.infoSala
        const { idSala } = getState().sala
        let controlTurno = currentTurn + 1;
        // console.log('-- player', player);
        // console.log('-- user',user);
        // console.log('-- puntajeGuardar',puntajeGuardar);
        const jugador = player.filter( jug => jug.id === user.uid )
        if( puntajeGuardar > 0 ){
            jugador[0].totalScore += puntajeGuardar
        }else{

        }
        jugador[0].show = !jugador[0].show
        // console.log('-- jugador', jugador);
        
        if(player.length===currentTurn){
            controlTurno = 1
        }
        console.log('-- currentTurn', currentTurn);
        console.log('-- controlTurno', controlTurno);
        const siguienteTurno = player.filter( jug => jug.turn === controlTurno )
        siguienteTurno[0].show = true
        console.log('-- player antes de guardarse en firestore',player );
        await firestore.collection('diezmil').doc(idSala).set({
            player, currentTurn: controlTurno,
        }, { merge: true });
        

}





