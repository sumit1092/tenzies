import React from 'react'
import './Die.css'

const Die = (props) =>{
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div 
            className = "die-face" 
            style={styles}
            onClick={props.handleDice}
            >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

export default Die