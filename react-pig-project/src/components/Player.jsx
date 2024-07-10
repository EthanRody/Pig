import { useEffect, useState } from "react"

function Player(props) {
    const [value, setValue] = useState(0)
    const [turnOver, setTurnOver] = useState(false)

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay))
    }
    
    // Simulates roll of die, if player 'rolls' a 1: ends turn without adding points to score
    async function rollDie() {
        if (!turnOver && props.isTurn) {
            const dieRoll = Math.ceil(Math.random()*6)
            setValue(dieRoll)

            if (dieRoll === 1) {
                setTurnOver(true)
                await timeout(700)
                props.nextTurn(props.id, true)

                setTimeout(() => setTurnOver(false), 100)
                setValue(0)
            }
            else {
                props.addPoints(props.id, dieRoll)
            } 
        }
    }

    // Ends player turn and adds points to score
    function endTurn() {
        if (!turnOver) {
            setTurnOver(true)
            props.nextTurn(props.id, false)
            setTimeout(() => setTurnOver(false), 100)
            setValue(0)
        }
    }

    // AI logic
    useEffect(() => {
        if (props.type === "AI" && props.isTurn && !turnOver) {
            let randomNum = Math.random()

            const aiDecision = async () => {
                await timeout(500)

                if (props.points+props.score >= 100) {
                    endTurn()
                } else if (props.points < 5) {
                    await rollDie()
                } else if (props.points < 10) {
                    if (randomNum < 0.8) {
                        await rollDie()
                    } else {
                        endTurn()
                    }
                } else if (props.points < 20) {
                    if (randomNum < 0.5) {
                        await rollDie()
                    } else {
                        endTurn()
                    }
                } else if (props.points < 30) {
                    if (randomNum < 0.3) {
                        await rollDie()
                    } else {
                        endTurn()
                    }
                } else {
                    endTurn()
                }
            };

            aiDecision()
        }
    }, [props.isTurn, props.type, props.points, turnOver])
    
    function determineClassName() {
        if (props.type == "AI") return "ai-card"
        else return "player-card"
    }

    return (
        <div>
            
            {<div className={determineClassName()}>
                <h2>Type: {props.type}</h2>
                <h2>{props.name}</h2>
                <h3>Score: {props.score}</h3>
                <h3>Points: {props.points}</h3>
            </div>}
            {props.isTurn && <h2 className="die" onClick={rollDie}>{value}</h2>}
            {props.isTurn && props.type != "AI" && <button onClick={endTurn}>End Turn</button>}
        </div>
    )    
}

export default Player