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
        
        setTimeout(() => {
            randomCol();
        }, 200);

    }, [randomCol]);



    const changeLight = () => {
        if(currentLight === 'red') alert("Game Over")
        if(currentLight === 'yellow') alert("Almost There")
        if(currentLight === 'green') alert("You Win you are great")
    }


    return (
        <>
            <section>

                <div className='traffic'>
                    <div className='one' style={red}></div>
                    <div className='two' style={yellow}></div>
                    <div className='three' style={green}></div>
                </div>
                <button onClick={changeLight}>Go</button>
            </section>
        </>
    )
}
export default Traffic
