import Die from "./Die"

function Player(props) {
    return (
        <div>
            <div className="player-card">
                <h2>{props.name}</h2>
                <h3>Score: {props.score}</h3>
            </div>
            {props.isTurn && <Die handleRoll={props.handleRoll} />}
        </div>
    )
        
}

export default Player