import {IconButton, makeStyles, Typography} from "@material-ui/core"
import {motion, useAnimation} from "framer-motion"
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react"
import './Camera.css'
import CameraObjects from "./CameraObjects"
import VideocamIcon from "@material-ui/icons/Videocam"

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: theme.shadows[2],
        '&:hover': {
            boxShadow: theme.shadows[4],
            '& .overlay': {
                background: 'rgba(0, 0, 0, 0.1)',
                opacity: 0.9
            },
            '& .title': {
                opacity: 0.9
            }
        }
    },
    overlay: {
        position: 'absolute',
        bottom: 9,
        right: 16,
        opacity: 0.8,
        transition: 'all 0.2s ease',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.15) !important',
            opacity: '1 !important'
        }
    },
    title: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 20,
        pointerEvents: 'none',
        opacity: 0.8
    }
}))

const Camera = ({index, setActiveCam, video}) => {
    const classes = useStyles()
    const cam = useRef()
    const [height, setHeight] = useState()
    const animation = useAnimation()

    const resize = useCallback(() => {
        const offsetHeight = cam.current.offsetWidth * 9 / 16
        cam.current.style.height = offsetHeight + 'px'
        setHeight(offsetHeight)
        cam.current.layoutId = index
    }, [index])

    useEffect(resize, [resize])

    useLayoutEffect(() => {
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [resize])

    return (
        <motion.div
            ref={cam}
            className={`${classes.card} Camera`}
            onMouseOver={() => animation.start({scale: 1.05})}
            onMouseOut={() => animation.start({scale: 1})}
            onClick={() => setActiveCam(index)}
            animate={animation}
        >
            {height && (
                <CameraObjects {...{index, height}}/>
            )}
            <IconButton
                className={`${classes.overlay} overlay`}
                onClick={() => {
                    setActiveCam(index)
                    video.value = true
                }}
            >
                <VideocamIcon/>
            </IconButton>
            <Typography className={`${classes.title} title`}>
                Камера {index}
            </Typography>
        </motion.div>
    )
}

export default Camera
