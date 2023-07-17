import { useState } from "react"

function Die(props) {
    const [value, setValue] = useState(4)

    function rollDie() {
        const dieRoll = Math.ceil(Math.random()*6)
        setValue(dieRoll)
        props.handleRoll(dieRoll)
    }

    return <h2 className="die" onClick={rollDie}>{value}</h2> 
}

export default Die