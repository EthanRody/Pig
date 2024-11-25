import logo from "../assets/die-icon.png"

// Navbar component displays at top of screen, displays app logo and name
// Has "Restart" (in game state 2&3) and "Menu" buttons, return to game states 2 and 0 respectively
function Navbar(props) {
    return (
        <nav>
            <img src={logo} className="logo"/>
            <h1 className="page-title">Pig</h1>
            <button 
                onClick={props.restart} 
                className={`restart-button ${props.gameState > 1 ? '': 'hidden'}`}
            >
                Restart
            </button>
            <button onClick={props.menu} className="restart-button">Menu</button>
        </nav>
    )
}

export default Navbar