import { useState, useEffect } from 'react'
import Player from "./components/Player"
import Navbar from "./components/Navbar"
import {nanoid} from "nanoid"
import './App.css'

/*The object of Pig is to be the first player to earn 100 points.
You achieve this by rolling the dice and adding which number you roll to your overall score.
Players are permitted to roll as many times as they’d like during their turn, but beware of rolling a 1!
Doing so will cost you all the points you’ve collected during your turn. */

function App() {
  const [players, setPlayers] = useState([{id: nanoid(), name: "Player 1", score: 0, isTurn: true}, {id: nanoid(),name: "Player 2", score: 0, isTurn: false}])
  const [gameState, setGameState] = useState(0)

  useEffect(() => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].score >= 100) setGameState(2)
    }
  }, [players])

  function updateNumberOfPlayers(change) {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers]
      if(change == 1 && prevPlayers.length < 5) {
        newPlayers.push({id: nanoid(), name: `Player ${prevPlayers.length+1}`, score: 0, isTurn: false})
      }
      else if (change == -1 && prevPlayers.length > 2) {
        newPlayers.pop()
      }

      return newPlayers
    })
  }

  function restart() {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers]
      for (let i = 0; i < prevPlayers; i++) {
        newPlayers[i].score = 0
      }
      return newPlayers
    })
    setGameState(0)
  }

  function startGame() {
    setGameState(2)
  }

  function handleRoll(event, value) {
    console.log("roll handled")
  }

  let game = null
  switch(gameState) {
    case 0:
      game = (
        <div className='start-menu'>
          <h1>Start Menu</h1>
          <div className="menu-buttons" >
            <h2>Number of Players: </h2>
            <button onClick={() => updateNumberOfPlayers(-1)}>{"<"}</button>
            <h3>{players.length}</h3>
            <button onClick={() => updateNumberOfPlayers(1)}>{">"}</button>
          </div>
          <div className="menu-buttons">
            <h2>Number of AI: </h2>
            <button>{"<"}</button>
            <h3>0</h3>
            <button>{">"}</button>
          </div>
          <button onClick={startGame}>Start Game</button>
        </div>
      )
      break
    case 2:
      const playerComponents = players.map(player => <Player key={player.nanoid} score={player.score} name={player.name} isTurn={player.isTurn} handleRoll={handleRoll} />)
    
      game = (
        <div className='players-display'>
          {playerComponents}
        </div>
      )
      break
    case 3:
      game = (
        <h1>Win Screen</h1>
      )
      break
  }

  return (
    <>
      <Navbar restart={restart} />
      <div className='game-display'>
        {game}
      </div>
    </>
  )
}

export default App
