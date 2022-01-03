import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {unirSalaAction} from '../redux/salaRedux'


const UnirSala = () => {

    const [salaName, setSalaName] = React.useState('')

    const dispatch = useDispatch()
    const { user } = useSelector(store=> store.usuario)

    const onClick = () =>{
        if(salaName.trim()==='') return;
        dispatch(unirSalaAction(salaName, user))
    } 

    return (
        <div className="input-group input-group-sm mb-3">
        <button
          className="btn  btn-outline-secondary"
          type="button"
          id="button-addon1"
          onClick={onClick}
        >
          Join
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          aria-describedby="button-addon1"
          onChange={e => setSalaName(e.target.value.toUpperCase())}
                value={salaName}
        />
        
      </div>
    )
}

export default UnirSala
