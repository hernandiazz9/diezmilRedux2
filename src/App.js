import React from 'react'
import { auth } from './firebase'

import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';

import {useDispatch, useSelector} from 'react-redux'
import {leerSalaAction} from './redux/salaRedux'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

const App = () => {

    const idSala = useSelector(store => store.sala.idSala)
    //const {player} = useSelector(store => store.sala.infoSala)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(leerSalaAction())
    }, [idSala])

      // Firebase
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          //console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    } 
    fetchUser()
}, [])

const PrivateRoute = ({component, path, ...rest}) =>{
    if(localStorage.getItem('usuario')){
        const userStorage = JSON.parse(localStorage.getItem('usuario'))
        if(userStorage.uid === firebaseUser.uid ){
            return <Route component={component} path={path} {...rest} />
        }else {
            return <Redirect to='login' {...rest}/>
        }
    }else {
        return <Redirect to='login' {...rest}/>
    }
}

    return firebaseUser !== false ? (
        <Router>
            <div className="container mt-3">
                <Navbar/>
                <Switch>
                    <PrivateRoute component={Home} path="/" exact/>
                    <Route component={Login} path="/login" exact/>
                </Switch>
            </div>
        </Router>
    ) : (<div> ...cargandio</div>)

}

export default App
