import React from 'react'
import CaraDado from './CaraDado'

const Dado = ({numDado}) => {
    let spanHTML= []
    const dotCreator = (dotNumber) =>{
        for (let index = 1; index <= dotNumber; index++) {
          spanHTML[index-1]=index
        }
    }
    return (
        <div>  
            <div id={`.${numDado}`} className={`die-list ${numDado}  odd-roll`} data-roll="6" >
                <div className="die-item" data-side="1">
                    {dotCreator(1)}
                        {   
                            spanHTML.map((key)=>{
                                return <CaraDado key={key}/>
                            })
                        }
                </div>
                <div className="die-item" data-side="2">
                    {dotCreator(2)}
                        {
                            spanHTML.map((kaey)=>{
                                return <CaraDado key={kaey}/>
                            })   
                        }
                </div>
                <div className="die-item" data-side="3">
                    {dotCreator(3)}
                        {
                            spanHTML.map((key)=>{
                                return <CaraDado key={key}/>
                            })   
                        }
                </div>
                <div className="die-item" data-side="4">
                    {dotCreator(4)}
                        {
                            spanHTML.map((key)=>{
                                return <CaraDado key={key}/>
                            })   
                        }
                </div>
                <div className="die-item" data-side="5">
                    {dotCreator(5)}
                        {
                            spanHTML.map((key)=>{
                                return <CaraDado key={key}/>
                            })   
                        }
                </div>
                <div className="die-item" data-side="6">
                    {dotCreator(6)}
                        {
                            spanHTML.map((key)=>{
                                return <CaraDado key={key}/>
                            })   
                        } 
                </div>
            </div>
        </div>
    )
}

export default Dado
