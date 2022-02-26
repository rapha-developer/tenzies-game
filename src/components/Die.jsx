function Die(props) {
    const dieClass = (props.isHeld === true ) ? 'die__face active' : 'die__face';
    return (
        <div className={dieClass} onClick={props.holdDice}>
            <h2 className="die__number">{props.value}</h2>
        </div>
    )
}
export default Die