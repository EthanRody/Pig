import { useState, useEffect } from 'react'
import Player from "./components/Player"
import Navbar from "./components/Navbar"
import PlayerName from "./components/PlayerName"
import {nanoid} from "nanoid"
import './App.css'

function App() {
  const [players, setPlayers] = useState([
    {
      id: nanoid(),
      name: "Player 1", 
      score: 0,
      points: 0,
      type: "Player",
      isTurn: true
    }, 
    {
      id: nanoid(), 
      name: "Player 2", 
      score: 0,
      points: 0,
      type: "AI",
      isTurn: false
  }])

  const [gameState, setGameState] = useState(0)
  const [winner, setWinner] = useState({
    name: "",
    player: false
  })

  useEffect(() => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].score >= 100) {
        setGameState(3)
        setWinner({ name: players[i].name, player: players[i].type !== "AI" })
      }
    }
  }, [players])

  function updateNumberOfPlayers(change) {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      if (change == 1 && prevPlayers.length < 5) {
        newPlayers.push({
          id: nanoid(),
          name: `Player ${prevPlayers.length + 1}`,
          score: 0,
          points: 0,
          type: 'AI',
          isTurn: false,
        })
      } else if (change == -1 && prevPlayers.length > 2) {
        newPlayers.pop();
      }

      return newPlayers;
    })
  }

  function restart() {
    setGameState(2)
    setPlayers(prevPlayers => {
      const newPlayers = []
      for (let i = 0; i < prevPlayers.length; i++) {
        newPlayers.push({...prevPlayers[i], score: 0, points:0, isTurn: false})
      }
      newPlayers[0].isTurn = true
      return newPlayers
    })
  }

  function returnToMenu() {
    setGameState(0)
    setPlayers(prevPlayers => {
      const newPlayers = []
      for (let i = 0; i < prevPlayers.length; i++) {
        newPlayers.push({...prevPlayers[i], score: 0, type: prevPlayers[i].type, points:0, isTurn: false, name: `Player ${i+1}`})
      }
      newPlayers[0].isTurn = true
      return newPlayers
    }) 
  }

  function chooseNames() {
    setGameState(1)
  }

  function startGame() {
    setGameState(2)
  }

  // Handles changing of player name in Game Settings Menu
  function handlePlayerChange(id, change, newValue) {
    setPlayers(prevPlayers => {
      const newPlayers = []
        for (let i = 0; i < prevPlayers.length; i++) {
          if (prevPlayers[i].id === id) {
            if (change == "name") newPlayers.push({...prevPlayers[i], name: newValue})
            else {
              if (prevPlayers[i].type == "AI") newPlayers.push({...prevPlayers[i], type: "Player"})
              else newPlayers.push({...prevPlayers[i], type: "AI"}) 
            }
          }
          else {
            newPlayers.push({...prevPlayers[i]})
          }
        }
        return newPlayers
      })  
  }

  // Handles changing of player turns
  function nextTurn(id, hasRolledOne) {
    setPlayers(prevPlayers => {
      const newPlayers = []
      let setNextTurn = false
      for (let i = 0; i < prevPlayers.length; i++) {
        if (prevPlayers[i].id === id) {
          if (hasRolledOne) {
            newPlayers.push({...prevPlayers[i], points: 0, isTurn: false})
          }
          else {
            newPlayers.push({...prevPlayers[i], score: prevPlayers[i].score+prevPlayers[i].points, points: 0, isTurn: false})
          }
          setNextTurn = true
        }
        else if (setNextTurn) {
          newPlayers.push({...prevPlayers[i], isTurn: true})
          setNextTurn = false
        }
        else {
          newPlayers.push({...prevPlayers[i]})
        }
      }

      if (setNextTurn) {
          newPlayers[0].isTurn = true
          setNextTurn = false
      }

      return newPlayers
    })
  }

  // Modifies player points value
  function addPoints(id, value) {
    setPlayers(prevPlayers => {
      const newPlayers = []
      for (let i = 0; i < prevPlayers.length; i++) {
        if (prevPlayers[i].id === id) {
          newPlayers.push({...prevPlayers[i], points: prevPlayers[i].points+value})
        }
        else {
          newPlayers.push({...prevPlayers[i]})
        }
      }
      return newPlayers
    })
  }

  let game = null
  switch(gameState) {
    // Start Menu Screen
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
          <button onClick={chooseNames}>Continue</button>
        </div>
      )
      break
        
    // Game Settings Menu Screen
    case 1: 
      const nameComponents = players.map(player => 
        <div>
          <PlayerName 
          key={player.id} 
          id={player.id} 
          name={player.name}
          type={player.type}
          handleChange={handlePlayerChange}
          />
        </div>
        )
    
      game = (
        <div>
          <div className='players-display'>
            {nameComponents}
          </div>
          <button onClick={startGame}>Start Game</button>
        </div>   
      )
      break

    // Game Screen
    case 2:
      const playerComponents = players.map(player => 
        <Player 
          key={player.id} 
          id={player.id} 
          score={player.score} 
          points={player.points} 
          name={player.name} 
          type={player.type}
          isTurn={player.isTurn} 
          nextTurn={nextTurn}
          addPoints={addPoints}
        />)
    
      game = (
        <div className='players-display'>
          {playerComponents}
        </div>
      )
      break

    // Game Finished Screen
    case 3:
      if (winner.player == true) {
        game = (
          <>
            <h1>Congratulations {winner.name}!</h1>
            <h1>You won!</h1>
          </>
        )
      } else {
        game = (
          <>
            <h1>Defeated!</h1>
            <h1>Better luck next time!</h1>
          </>
        )
      }

      
      break
  }

  return (
    <>
      <Navbar menu={returnToMenu} restart={restart} gameState={gameState}/>
      <div className='game-display'>
        {game}
      </div>
      <h2>Rules</h2>
      <p>The object of Pig is to be the first player to reach 100 score.</p>
      <p>Players take turns having possession of the die, and will roll it to accumulate score.</p>
      <p>Players are permitted to roll as many times as they would like to during their turn, but must beware of rolling a 1!</p>
      <p>Rolling a 1 will have the player lose all the points they accumulated during the current turn and their turn will immediately end.</p>
      <p>Players can roll the die by clicking on the die image and end their turn by clicking the 'End Turn' button.</p>
    </>
  )
}

export default App
