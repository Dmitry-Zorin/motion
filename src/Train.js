import {motion} from "framer-motion"
import {useEffect, useRef} from "react"

const Train = ({large, isCloseToDoors}) => {
    const train = useRef()

    const isAnyoneCloseToDoors = isCloseToDoors.some(e => e)

    useEffect(() => {
        setTimeout(() => {
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
                borderBottom: `${large ? 12 : 3}px solid #${isAnyoneCloseToDoors ? 'BC4B51' : '659B5E'}`,
                background: isAnyoneCloseToDoors ? '#C27779' : '#80AC7A',
                position: 'absolute',
                transitionProperties: 'background-color, border',
                transitionFunction: 'ease'
            }}
        />
    )
}

export default Train
