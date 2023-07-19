import { useState } from "react"

function Player(props) {
    const [value, setValue] = useState(4)
    const [turnOver, setTurnOver] = useState(false)

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay))
    }

    async function rollDie() {
        if (!turnOver) {
            const dieRoll = Math.ceil(Math.random()*6)
            setValue(dieRoll)

            if (dieRoll === 1) {
                setTurnOver(true)
                await timeout(700)
                setTurnOver(false)

                props.nextTurn(props.id, true)
            }
            else {
                props.addPoints(props.id, dieRoll)
            } 
        }
    }

    function endTurn() {
        if (!turnOver) {
            props.nextTurn(props.id, false)
        }
    }
    
    return (
        <div>
            <div className="player-card">
                <h2>{props.name}</h2>
                <h3>Score: {props.score}</h3>
                <h3>Points: {props.points}</h3>
            </div>
            {props.isTurn && <h2 className="die" onClick={rollDie}>{value}</h2>}
            {props.isTurn && <button onClick={endTurn}>End Turn</button>}
        </div>
    )
    
        
}

export default Player