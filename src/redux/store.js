import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer, {leerUserAction} from './loginRedux'
import salaReducer from './salaRedux'
import DadosReducer from './nuevoRedux'

const rootReducer = combineReducers({
    usuario: userReducer,
    sala:salaReducer,
    dados:DadosReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    leerUserAction()(store.dispatch)
    
    return store
}