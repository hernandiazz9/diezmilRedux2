import React from 'react'
import CaraDado from './CaraDado'

const Dado = () => {

    return (
        <div>  
            <div className="die-list odd-roll" data-roll="2" >
                <div className="die-item" data-side="1">
                    <CaraDado 
                        n='1'
                    />
                </div>
                <div className="die-item" data-side="2">
                    <CaraDado 
                        n='2'
                    />
                </div>
                <div className="die-item" data-side="3">
                    <CaraDado 
                        n='3'
                    />
                </div>
                <div className="die-item" data-side="4">
                    <CaraDado 
                        n='4'
                    />
                </div>
                <div className="die-item" data-side="5">
                    <CaraDado 
                        n='5'
                    />
                </div>
                <div className="die-item" data-side="6">
                    <CaraDado 
                        n='6'
                    />
                </div>
            </div>
        </div>
    )
}

export default Dado
