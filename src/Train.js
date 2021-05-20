import {motion} from "framer-motion"
import {useEffect, useRef} from "react"

const Train = ({large, isCloseToDoors}) => {
    const train = useRef()

    useEffect(() => {
        setTimeout(() => {
            //const trainStyle =train.current.style
            train.current.style.transitionDuration = '0.2s'
            train.current.style.transitionDelay = '0.4s'
        }, 1000)
    }, [])

    return (
        <motion.div
            ref={train}
            style={{
                width: '100%',
                height: large ? 100 : 25,
                borderBottom: `${large ? 12 : 3}px solid #${isCloseToDoors ? 'BC4B51' : '659B5E'}`,
                background: isCloseToDoors ? '#C27779' : '#80AC7A',
                position: 'absolute',
                transitionProperties: 'background-color, border',
                transitionFunction: 'ease'
            }}
        />
    )
}

export default Train
