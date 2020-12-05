import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {crearSalaAction} from '../redux/salaRedux'


const CrearSala = () => {
    const [salaName, setSalaName] = React.useState('')

    const dispatch = useDispatch()
    const nombreJugador = useSelector(store=> store.usuario.user.nombre)

    const onClick = () =>{
        if(salaName.trim()==='') return;
        dispatch(crearSalaAction(salaName, nombreJugador))
    }

    return (
        <div>
            <span>Crear Sala</span>
            <input 
                type="text"
                onChange={e => setSalaName(e.target.value.toUpperCase())}
                value={salaName}
            />
            <button 
                type='button'
                onClick={onClick}
            >
                CrearSala
            </button>
        </div>
    )
}

export default CrearSala
