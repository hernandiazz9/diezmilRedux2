import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logOutAction} from '../redux/loginRedux'
import { withRouter } from 'react-router-dom'




const Navbar = (props) => {
    const dispatch = useDispatch()
    const cerrarSesion = () =>{
        dispatch(logOutAction())
        props.history.push('/login')
    }

    const activo = useSelector(store=>store.usuario.activo)
    const nombre = useSelector(store=>store.usuario.user.nombre)

    return (
        <>
            <div className=" navbar-dark font-weight-bold text-white pt-2 text-center   bg-dark">DiezMil</div>
            <div className="navbar navbar-dark bg-dark">

                <Link to="/" className="navbar-brand"> {activo? nombre:'Home'}</Link>
                <div>
                    <div className="d-flex">
                        {
                            activo? 
                                (
                                    <>
                                        <NavLink className="btn btn-dark mr-2" to="/" exact> Home</NavLink>
                                        <button
                                            className="btn btn-dark"
                                            onClick={cerrarSesion}
                                        >cerrar Sesión
                                        </button>
                                    </>
                                )
                            :(
                                <NavLink className="btn btn-dark mr-2" to="/login" exact> Login</NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter (Navbar)