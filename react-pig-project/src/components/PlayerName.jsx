function PlayerName(props) {
    function handleNameChange(event) {
        const {value} = event.target
        props.handleChange(props.id, "name", value)
    }

    function handleTypeChange(event) {
        props.handleChange(props.id, "type", event.target)
    }

    function determineClassName() {
        if (props.type == "AI") return "ai-card"
        else return "player-card"
    }
    
    return (
        <div className={determineClassName()}>
            <h3>Choose Name</h3>
            <input className="name-input" type="text" maxLength={15} value={props.name} onChange={handleNameChange}></input>
            <div>
                AI: <input type="checkbox" checked={props.type === "AI"} onClick={handleTypeChange} />
            </div>
        </div>
    )
}

export default PlayerName