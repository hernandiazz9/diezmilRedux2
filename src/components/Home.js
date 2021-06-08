import React from 'react'
import CrearSala from './CrearSala'
import UnirSala from './UnirSala'

import {useDispatch, useSelector} from 'react-redux'
import {salirSalaAction} from '../redux/salaRedux'
import Dice from './Dice'
import NuevoDice from './NuevoDice'

const Home = () => {
    const haySala = useSelector(store=> store.sala.haySala)
    const {roomName} = useSelector(store=> store.sala.infoSala)
    const {idSala} = useSelector(store=> store.sala)
    const nombreJugador = useSelector(store=> store.usuario.user.nombre)
    const {loading2} = useSelector(store=> store.sala)
    const {salaError} = useSelector(store=> store.sala)
    const {puntajeDeTiro} = useSelector(store=> store.dados)
    const {puntajeRonda} = useSelector(store=> store.dados)
    
    const dispatch = useDispatch()

    return (
        <div className='mt-5'>
            {
                loading2? <div>cargando...</div>
                :haySala?
                    <>
                    <h1>Puntos de Tiro {puntajeDeTiro}</h1>
                    <h1>Puntos de guardado {puntajeRonda}</h1>
                        <div>
                            {/* <Dice/> */}
                            <NuevoDice/>
                        </div>
                        <div>{roomName}</div>
                        <button type='button'
                            onClick={()=>dispatch(salirSalaAction(idSala, nombreJugador ))}
                        >SalirSala</button>
                    </>
                :   
                        
                    loading2? <div>cargando...</div>
                    :<>
                        {salaError && <div>NO EXISTE ESA SALA</div> }
                        <CrearSala />
                        <UnirSala />
                     </>
                        
                    
            }
        </div>
    )
}

export default Home
