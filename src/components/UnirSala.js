import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {unirSalaAction} from '../redux/salaRedux'


const UnirSala = () => {

    const [salaName, setSalaName] = React.useState('')

    const dispatch = useDispatch()
    const nombreJugador = useSelector(store=> store.usuario.user.nombre)

    const onClick = () =>{
        if(salaName.trim()==='') return;

        dispatch(unirSalaAction(salaName, nombreJugador))
    }

    return (
        <div>
            <span>Unir a Sala</span>
            <input 
                type="text"
                onChange={e => setSalaName(e.target.value.toUpperCase())}
                value={salaName}
            />
            <button 
                type='button'
                onClick={onClick}
            >
                UnirSala
            </button>
        </div>
    )
}

export default UnirSala
