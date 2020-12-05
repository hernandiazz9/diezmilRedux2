import { auth, provider } from '../firebase'

//data inicial

const dataInicial = {
    loading: false,
    activo: false,
    user:{
        nombre:null
    }

}

//types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'


//reducer
export default function userReducer (state = dataInicial, action){
     switch(action.type){
        case LOADING:
             return {...state, loading:true}
        case USUARIO_ERROR:
        case CERRAR_SESION:
            return {...dataInicial}
        case USUARIO_EXITO:
            return {...state, loading:false, activo:true, user:action.payload}
        
        default: 
            return {...state} 
     }
}


//actions
export const loginUserAction = () => async (dispatch) => {
    dispatch({
        type:LOADING
    })
    try {
        const res = await auth.signInWithPopup(provider)
        console.log(res);
        dispatch({
            type: USUARIO_EXITO,
            payload: {
                uid : res.user.uid,
                email: res.user.email,
                nombre:res.user.displayName
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid : res.user.uid,
            email: res.user.email,
            nombre:res.user.displayName
        }))
    } catch (error) {
        console.log(error);
        dispatch ({
            type:USUARIO_ERROR
        })
    }
}

export const leerUserAction = () => (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload:JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const logOutAction = () => (dispatch) =>{
    auth.signOut();
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
    })
}