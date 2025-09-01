import React, { useState, useEffect } from 'react'

const Traffic = () => {

    const redColor = {
        backgroundColor: "red"
    }

    const yellowColor = {
        backgroundColor: "yellow"
    }

    const greenColor = {
        backgroundColor: "green"
    }

    const offColor = {
        backgroundColor: "white"
    }

    const [red, setRed] = useState(offColor)
    const [yellow, setYellow] = useState(offColor)
    const [green, setGreen] = useState(offColor)
    const [currentLight, setCurrentLight] = useState(null)
    const [correct, setCorrect] = useState(0)

           

    const randomCol = () => {
        const lights = ['red', 'yellow', 'green']
        const random = lights[Math.floor(Math.random() * lights.length)]
        setCurrentLight(random)

        setRed(offColor)
        setYellow(offColor)
        setGreen(offColor)


        if (random === 'red') setRed(redColor)
        if (random === 'yellow') setYellow(yellowColor)
        if (random === 'green') setGreen(greenColor)

    }

    useEffect(() => {
        
        const interval = setTimeout(() => {
            randomCol();
        }, 200);

         return () => clearInterval(interval);

    }, [randomCol]);



    const changeLight = () => {
        if(currentLight === 'red') alert("Game Over")
        if(currentLight === 'yellow') alert("Almost There")
        if(currentLight === 'green') {
            setCorrect(correct + 1)
        }
    }


    return (
        <>
            <section>
                 <h1>Traffic Light Reflex</h1>
                 <h1>How To Play?</h1>
                 <p>Traffic light change randomly (red, yellow, green). User must click "Go" only when green. Wrong click means game over</p>
                <div className='traffic'>
                   
                    <div className='one' style={red}></div>
                    <div className='two' style={yellow}></div>
                    <div className='three' style={green}></div>
                </div>
                <h1>Green Pressed : {correct}</h1>
                <button onClick={changeLight}>Go</button>
            </section>
        </>
    )
}
export default Traffic