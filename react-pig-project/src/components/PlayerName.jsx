function PlayerName(props) {

    function handleChange(event) {
        const {value} = event.target
        props.handleChange(props.id, value)
    }

    return (
        <div className="player-card">
            <h3>Choose Your Name</h3>
            <input className="name-input" type="text" maxLength={15} value={props.name} onChange={handleChange}></input>
        </div>
    )
}

export default PlayerName