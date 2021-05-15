import {motion, useAnimation, useMotionValue} from "framer-motion"
import {useEffect, useRef, useState} from "react"
import Bus from "./Bus"
import GUI from "./GUI"
import Human from "./Human"
import './Camera.css'

const Camera = ({camera, index, setActiveCamera, element, setElement}) => {
    const mainArea = useRef()
    const scale = useMotionValue(1)
    const animation = useAnimation()
    const [zoom, setZoom] = useState(100)

    useEffect(() => {
        if (!element) return

        const transform = mainArea.current.style.transform
        let [translateX = 0, translateY = 0, translateZ, scale = 1] = (transform.match(/-?\d+(\.\d+)?/g) || []).slice(1, 5).map(e => +e)

        const newScale = scale * 1.5 ** (-1 * Math.sign(element.deltaY))
        if (newScale < 1) {
            animation.start({x: 0, y: 0, transition: {bounce: 0}})
                .then(() => setElement(null))
            return
        }

        const ratio = 1 - newScale / scale
        let x = translateX + (element.clientX - window.innerWidth / 2 - translateX) * ratio
        let y = translateY + (element.clientY - window.innerHeight / 2 - translateY) * ratio

        if (newScale === 1) x = y = 0

        setZoom(100 * newScale)
        animation.start({x, y, scale: newScale, transition: {bounce: 0}})
            .then(() => setElement(null))
    }, [animation, element, setElement])

    return (
        <div className='Container' onWheel={e => !element && setElement(e)}>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{ease: 'easeOut', duration: 0.3}}
            >
                <GUI title={camera.name} {...{animation, zoom, setZoom}}/>
                <motion.div
                    className='Container Background'
                    onClick={() => setActiveCamera(null)}
                />
            </motion.div>
            <motion.div
                className='Camera'
                ref={mainArea}
                style={{scale}}
                drag={zoom > 100}
                dragMomentum={false}
                animate={animation}
                layoutId={index}
                whileTap={{cursor: zoom > 100 && 'grabbing'}}
                onClick={e => e.stopPropagation()}
            >
                <Bus/>
                <Human/>
                <Human x={'calc(48vh - 16px)'} y={'calc(48vh - 16px)'}/>
            </motion.div>
        </div>
    )
}

export default Camera
