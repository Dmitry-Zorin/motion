import {motion} from "framer-motion"
import {useEffect, useRef} from "react"

const Train = ({large, height, isCloseToDoors}) => {
    const train = useRef()

    const isAnyoneCloseToDoors = isCloseToDoors.some(e => e)

    useEffect(() => {
        setTimeout(() => {
            train.current.style.transition = 'all 0.2s ease 0.4s'
        }, 1000)
    }, [])

    return (
        <motion.div
            ref={train}
            style={{
                width: '100%',
                height: large ? '15vh' : height / 6,
                borderBottom: `${large ? 12 : 3}px solid rgba(0,0,0, 0.15)`,
                background: isAnyoneCloseToDoors ? '#DA3917' : '#80AC7A',
                position: 'absolute'
            }}
        />
    )
}

export default Train
