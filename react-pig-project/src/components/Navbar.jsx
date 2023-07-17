import logo from "../assets/react.svg"

function Navbar(props) {
    return (
        <nav>
            <img src={logo} className="logo"/>
            <h1 className="page-title">Pig</h1>
            {props.gameState > 1 && <button onClick={props.restart} className="restart-button">Restart</button>}
            <button onClick={props.menu} className="restart-button">Menu</button>
        </nav>
    )
}

export default Navbar