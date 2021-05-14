import {motion, useAnimation, useMotionValue} from "framer-motion"
import {useEffect, useRef, useState} from "react"
import Bus from "./Bus";
import GUI from "./GUI"
import Human from "./Human";

const size = '96vh'

const Camera = ({camera, index, setActiveCamera, element, setElement}) => {
    const mainArea = useRef()
    const scale = useMotionValue(1)
    const animation = useAnimation()
    const [zoom, setZoom] = useState(100)

    useEffect(() => {
        if (!element) return

        const transform = mainArea.current.style.transform
        let [translateX = 0, translateY = 0, translateZ = 0, scale = 1] = (transform.match(/-?\d+(\.\d+)?/g) || []).slice(1, 5).map(e => +e)

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
        <motion.div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                cursor: 'pointer',
            }}
            onClick={() => setActiveCamera(null)}
            onWheel={e => !element && setElement(e)}
            initial={{
                background: 'transparent'
            }}
            animate={{
                background: 'rgba(0, 0, 0, 0.6)'
            }}
            exit={{
                background: 'transparent'
            }}
        >
            <GUI title={camera.name} {...{animation, zoom, setZoom}}/>
            <motion.div
                ref={mainArea}
                style={{
                    scale,
                    width: size,
                    height: size,
                    background: '#51545B',
                    borderRadius: 25,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'arrow'
                }}
                initial={{
                    opacity: 1
                }}
                drag={zoom > 100}
                dragMomentum={false}
                animate={animation}
                layoutId={index}
                layout
                whileHover={{cursor: zoom > 100 && 'grab'}}
                whileTap={{cursor: zoom > 100 && 'grabbing'}}
                onClick={e => e.stopPropagation()}
            >
                <Bus/>
                <Human/>
                <Human x={'calc(48vh - 16px)'} y={'calc(48vh - 16px)'}/>
            </motion.div>
        </motion.div>
    )
}

export default Camera
