import { useEffect, useState } from 'react'

function Watch(props) {
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [clock, setClock] = useState("00:00")

    const bestTimeFromStorage = JSON.parse(localStorage.getItem("best_time")) 
    const [bestTime, setBestTime] = useState( bestTimeFromStorage || "99:00");

    useEffect(() => { 
        if(isRunning) {
            const id = window.setInterval(() => {
                setSeconds(seconds => seconds + 1)
            }, 1000);
            return () => window.clearInterval(id)
        }
        return undefined
    }, [isRunning])

    useEffect(() => {
        if (seconds > 59) {
            setMinutes(minutes => minutes + 1)
            setSeconds(0)
        }
        const minutesToString = minutes < 10 ? `0${minutes}` : minutes;
        const secondsToString = seconds < 10 ? `0${seconds}` : seconds;
        setClock(`${minutesToString}:${secondsToString}`)
    }, [seconds])
    
    useEffect(() => {
        const tracksRoll = props.tracksNumber;
        const winGame = props.tenzies;
        
        if (!winGame && tracksRoll === 0) {
            setBestTime(bestTimeFromStorage)
            resetTimer()
        }
        if ( tracksRoll < 10 ) {
            setIsRunning(true)
        }
        if ( tracksRoll === 10 ) {
            setIsRunning(false)

            const bestTime__minutes = parseInt(bestTime.substring(0, 2));
            const bestTime__seconds = parseInt(bestTime.substring(3, 5));

            if ( winGame &&
                (bestTime__minutes > minutes ) || 
                (bestTime__minutes == minutes && bestTime__seconds > seconds) ) {
                    localStorage.setItem("best_time", JSON.stringify(clock));
                }
        }
    }, [props.tracksNumber, props.tenzies])

    function resetTimer() {
        setIsRunning(false)
        setSeconds(0)
        setMinutes(0)
    }

    return (
        <div className="watch">
            <div class="watch__time" id="timer">Your time: {clock}</div>
            <div class="watch__time" id="timer">Best time: {bestTime}</div>
        </div>
    )
}

export default Watch