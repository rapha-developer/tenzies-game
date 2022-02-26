import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import Confetti from 'react-confetti'

import Die from './components/Die'
import Watch from './components/Watch'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [messageBtn, setMessageBtn] = useState('Roll');
  const [tracksNumber, setTracksNumber] = useState(0)
  
  useEffect(() => {
    const first_number = dice[0].value;
    const areAllHeld = dice.every(diceItem => diceItem.isHeld === true);
    const areAllSame = dice.every(diceItem => diceItem.value === first_number);

    const tracksRoll = getFrequencyOfHeld()
    setTracksNumber(tracksRoll)
    
    if ( areAllHeld && areAllSame ) {
      setTenzies(true)
      setMessageBtn('New Game')
    } 
    if (areAllHeld && !areAllSame ) {
      setMessageBtn('Try again')
    }
  }, [dice])

  function getFrequencyOfHeld() {
    let number = 0; 
    for (let iHeldCount = 0; iHeldCount < dice.length; iHeldCount++) {
      if ( dice[iHeldCount].isHeld ) {
        number += 1
      }
    }
    return number;
  }
  function createDice(id) {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: id
    }
  }
  function allNewDice() {
    const newDice = [];
    for (let iDice = 0; iDice < 10; iDice++) {
      newDice.push(createDice(iDice));
    }
    return newDice;
  }
  const diceElements = dice.map((dieItem) => {
    return <Die key={dieItem.id} 
                isHeld={dieItem.isHeld}
                value={dieItem.value} 
                holdDice={() => holdDice(dieItem.id)}
                />
  })
  function holdDice(id) {
    setDice(oldDice => oldDice.map(dieItem => {
        return dieItem.id === id ? 
        {...dieItem, isHeld: !dieItem.isHeld} :
        {...dieItem}
    }))
  }
  function rollDice() {
    if (messageBtn !== 'Roll') {
      setMessageBtn('Roll')
      setDice(allNewDice())
      setTracksNumber(0)
    }
    if ( tenzies ) {
      setTenzies(oldTenzies => !oldTenzies) 
    } else {
      setDice(oldDice => oldDice.map(dieItem => {
        return dieItem.isHeld === true ?
          {...dieItem} :
          createDice(dieItem.id)
      }))
    }
  }
  return (
    <main className='main'>
      { tenzies && <Confetti /> }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="indicators">
        <a href="#" className='indicators__track'>Tracks: {tracksNumber}</a>
        <Watch tracksNumber={tracksNumber} tenzies={tenzies} />
      </div>
      <div className="dice__container">
        {diceElements}
      </div>
      <button className='btn' onClick={rollDice}>{messageBtn}</button>
    </main>
  )
}

export default App
