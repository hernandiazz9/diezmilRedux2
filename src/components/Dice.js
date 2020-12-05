import React from 'react'

const Dice = ({setRevisartres}) => {
    function rollDice() {
      const dice = [...document.querySelectorAll(".die-list")];
      var array = []
      dice.forEach(die => {
          toggleClasses(die);
          die.dataset.roll = getRandomNumber(1, 6);
          array.push(Number(die.dataset.roll))
      });
      setRevisartres(array)
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

      const span = <span className="dot"></span>
      let spanHTML= []
      const dotCreator = (dotNumber) =>{
        for (let index = 1; index <= dotNumber; index++) {
          spanHTML.push(span)
        }
      }

      return (
        <div>
          <div className="dice">
            <div id="die-1">
              <div className="die-list even-roll " data-roll="1" >
                <div className="die-item" data-side="1">
                    {dotCreator(1)}
                    {spanHTML.map(span=>{
                      spanHTML = []
                      return span 
                    })}
                </div>
                <div className="die-item" data-side="2">
                  {dotCreator(2)}
                  {spanHTML.map(span=>{
                    spanHTML = []
                    return span
                  })}
                </div>
                <div className="die-item" data-side="3">
                  {dotCreator(3)}
                  {spanHTML.map(span=>{
                    spanHTML = []
                    return span
                  })}
                    
                </div>
                <div className="die-item" data-side="4">
                {dotCreator(4)}
                  {spanHTML.map(span=>{
                    spanHTML = []
                    return span
                  })}
                </div>
                <div className="die-item" data-side="5">
                {dotCreator(5)}
                  {spanHTML.map(span=>{
                    return span
                  })}
                </div>
                <div className="die-item" data-side="6">
                  {dotCreator(6)}
                    {spanHTML.map(span=>{
                      spanHTML = []
                      return span
                    })}
                </div>
              </div>
              
            </div>
            
            <div id="die-2">  
              <div className="die-list odd-roll" data-roll="2" >
                <div className="die-item" data-side="1">
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="2">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="3">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="4">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="5">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="6">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
            <div id="die-3">
              <div className="die-list even-roll" data-roll="3" >
                <div className="die-item" data-side="1">
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="2">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="3">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="4">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="5">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="6">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
            <div id="die-4">
              <div className="die-list odd-roll" data-roll="4" >
                <div className="die-item" data-side="1">
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="2">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="3">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="4">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="5">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="6">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
              </div>      
            <div id="die-5">
              <div className="die-list odd-roll" data-roll="5" >
                <div className="die-item" data-side="1">
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="2">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="3">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="4">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="5">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="die-item" data-side="6">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </div>
          <button type="button" id="roll-button"
            onClick={rollDice}
          >Roll Dice</button>
        </div>
      )
}
    
    export default Dice
