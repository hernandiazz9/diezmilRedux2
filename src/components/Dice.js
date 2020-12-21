import React, { useState, useEffect } from 'react'
import Dado from './Dado';
import {useDispatch, useSelector} from 'react-redux'
import {tirarDadosAction, guardarDadoAction} from '../redux/dadosRedux'

var dadosGuardados = [];

const Dice = () => {
  const [dadosTirar, setDadosTirar] = useState(['.d1','.d2','.d3','.d4','.d5'])
  const [dadosGuardados, setDadosGuardados] = useState([])
  const [valorDadosHTML, setValorDadosHTML] = useState([])
  const [dadoSeleccionado, setDadoSeleccionado] = useState(null)
  const [dadoARevisarTres, setDadoARevisarTres] = useState([])
  const {seTiro} = useSelector(state => state.dados)
  //const valorDados = useSelector(state => state.dados.arrayDados)
  const dispatch = useDispatch()

  //const [arrayDados, setArrayDados] = useState([])
  function rollDice() {
    setDadoARevisarTres([])
    const arrayDados = []
      const dice = [...document.querySelectorAll(dadosTirar)];
      dice.forEach(die => {
          toggleClasses(die);
          die.dataset.roll = getRandomNumber(1, 6);
          arrayDados.push(Number(die.dataset.roll))
      });
      console.log(dice);
      setValorDadosHTML(dice)
      dispatch(tirarDadosAction(arrayDados))
    }
    function toggleClasses(die) {
      die.classList.toggle("odd-roll");
      die.classList.toggle("even-roll");
    }
    function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    useEffect(() => {
      const dadosATirar = dadosTirar.filter(dado=>{
        return !dadosGuardados.includes(dado);
      })
      setDadosTirar(dadosATirar)
    }, [dadosGuardados])

    const onClickDado = ( dadoNombre ) =>{
      const dadoEncontrado = valorDadosHTML.find((dado)=>{
          return dado.id === dadoNombre
      });
      setDadoSeleccionado(dadoEncontrado);
      console.log(dadoEncontrado.id);
      if(Number(dadoEncontrado.dataset.roll)!==1&&Number(dadoEncontrado.dataset.roll)!==5){
        setDadoARevisarTres([...dadoARevisarTres, dadoEncontrado.dataset.roll]) 
        
      }else{
        dispatch(guardarDadoAction(dadoEncontrado.dataset.roll))
        setDadosGuardados ([...dadosGuardados,dadoNombre ])
      }
    }  
    var tresDadosSeleccionar={}
    useEffect(() => {
      console.log(valorDadosHTML);
      dadoARevisarTres.forEach( x => { tresDadosSeleccionar[x] = (tresDadosSeleccionar[x] || 0)+1; });
        Object.values(tresDadosSeleccionar).forEach(element => {
          if(element === 3){
            const encontrarTres = valorDadosHTML.filter(dado=>{
              console.log(dado.dataset.roll,dadoSeleccionado.dataset.roll);
              return dado.dataset.roll === dadoSeleccionado.dataset.roll
            })
            console.log(encontrarTres, 'enconytrar 3');
            encontrarTres.forEach(dado=>{
              setDadosGuardados (...dadosGuardados ,dado.id  )
            })
            //console.log(dadoSeleccionado.id);
            //setDadosTirar(dadosTirar => dadosTirar.filter(dado=>dado===dadoSeleccionado.id))
            //console.log(dadosTirar);
            //console.log('son 3');
          }
        })  
    }, [dadoARevisarTres])

      return (
        <>
          <div className="dice">
            <div className={dadosTirar.includes('.d1')?'seTiro': 'seGuardo' }  
              id="die-1">
              <button
                style={{background:'none' ,border: 0 + 'px' }} 
                type='button'
                onClick={()=>onClickDado('.d1')}
                ><Dado numDado='d1'/>
              </button>
            </div>
            <div className={dadosTirar.includes('.d2')?'seTiro': 'seGuardo'}  
                id="die-2">  
              <button
                style={{background:'none' ,border: 0 + 'px' }}
                type='button'
                onClick={()=>onClickDado('.d2')}
                ><Dado numDado='d2'/>
              </button>
            </div>
            <div className={dadosTirar.includes('.d3')?'seTiro': 'seGuardo'}  
                id="die-3">
              <button
                style={{background:'none' ,border: 0 + 'px' }}
                type='button'
                onClick={()=>onClickDado('.d3')}
                ><Dado numDado='d3' />
              </button>
            </div>
            <div className={dadosTirar.includes('.d4')?'seTiro': 'seGuardo' }  
                id="die-4">
              <button
                style={{background:'none' ,border: 0 + 'px' }}
                type='button'
                onClick={()=>onClickDado('.d4')}
                ><Dado numDado='d4' />
              </button>
              </div>      
              <div className={dadosTirar.includes('.d5')?'seTiro': 'seGuardo' }  
                id="die-5">
              <button
                style={{background:'none' ,border: 0 + 'px' }}
                type='button'
                onClick={()=>onClickDado('.d5')}
                ><Dado numDado='d5' />
              </button>
            </div>
          </div>
          <button type="button" id="roll-button"
            onClick={rollDice}
            disabled={seTiro}
          >Roll Dice
          </button>
        </>
      )
}
    
    export default Dice
