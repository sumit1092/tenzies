import React from 'react'
import './App.css'
import Die from '../Die'
import {nanoid} from "nanoid"


const App = () => {

	const [dice, setDice] = React.useState(allNewDice())
	const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(()=>{
		//make every isHeld value true 
		const allHeld = dice.every(x => x.isHeld)
		console.log(allHeld)
		const firstValue = dice[0].value
		const allValue = dice.every(x => x.value === firstValue)
		if(allHeld && allValue){
			setTenzies(true)
			console.log("You Won!")
		}
	},[dice])


	function allNewDice(){
		const arr=[];

		for(let i=0;i<10;i++){
			arr.push({
				value: Math.floor(Math.random() * 6),
			    isHeld: false,
				id: nanoid()
			})
		}
		return arr
	}
	// console.log(allNewDice())

	function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }


	function rollDice(){
		if(!tenzies){
			setDice(oldDice => oldDice.map(die => {
				return die.isHeld ? 
					die :
					generateNewDie()
			}))
		}else{
			setTenzies(false)
		}
	}

	function handleDice(id){
		setDice(oldDice => oldDice.map((x)=>
			  x.id === id? {
					...x, 
					isHeld: !x.isHeld
				}:x				
		))
	}

	const element = x => <Die
	                 key={x.id} 
					 value={x.value}
					 isHeld= {x.isHeld}
					 handleDice={()=>handleDice(x.id)}
					 />
	const diceElement = dice.map(element)

	return (
		<main>
		<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className= 'dice-container'>
				{diceElement}
			</div>
			<button 
			      className="roll-dice" 
				  onClick={rollDice}
			>{tenzies ? "New Game": "Roll"}
			</button>
		</main>
	)
}

export default App
