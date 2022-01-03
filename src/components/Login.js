import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loginUserAction} from '../redux/loginRedux'
import { withRouter } from 'react-router-dom'

const Login = (props) => {
    const dispatch = useDispatch()

    const loading = useSelector(store=>store.usuario.loading)
    const activo = useSelector(store=>store.usuario.activo)
    
    React.useEffect(() => {
        if(activo)props.history.push('/')
    }, [activo])

    return (
        <div className="mt-5 text-center">
            <h3 id='ingresoGoogle'>Login with Google</h3>
            <hr/>
            <button 
                className="btn btn-dark"
                onClick={()=>dispatch(loginUserAction())}
                disabled={loading}
            >go on
            </button>
        </div>
    )
}

export default withRouter (Login)
