import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const ListaJugadoresPuntaje = () => {
    const [players, setPlayers] = useState([])
    // const [, set] = useState(initialState)
    const { infoSala } = useSelector(state => state.sala)
    const { user } = useSelector(state => state.usuario)
    useEffect(() => {
        setPlayers(infoSala.player)
    }, [infoSala])
    console.log('players',players);
    console.log('user',user);
    // if(player.id === user.uid){

    // }
    return (
        <>
            {players&&players.map(jug=>(
               <span className='py-5' key={jug.id}>
                   <p className={jug.show?' text-warning':'text-white'}>{jug.playerName}: {jug.totalScore}</p>
               </span> 
            ))}
        </>
    )
}

export default ListaJugadoresPuntaje
