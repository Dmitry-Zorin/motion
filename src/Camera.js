import {makeStyles} from "@material-ui/core"
import {motion, useAnimation} from "framer-motion"
import {useEffect, useRef, useState} from "react"
import './Camera.css'
import CameraObjects from "./CameraObjects"

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: theme.shadows[2],
        '&:hover': {
            boxShadow: theme.shadows[4]
        }
    }
}))

const Camera = ({index, setActiveCam}) => {
    const classes = useStyles()
    const cam = useRef()
    const [height, setHeight] = useState()
    const animation = useAnimation()

    useEffect(() => setHeight(cam.current.offsetHeight), [])

    return (
        <motion.div
            ref={cam}
            className={`Camera ${classes.card}`}
            onClick={() => setActiveCam(index)}
            onMouseOver={() => animation.start({scale: 1.05})}
            onMouseOut={() => animation.start({scale: 1})}
            layoutId={index}
            animate={animation}
        >
            {height && (
                <CameraObjects {...{index, height}}/>
            )}
        </motion.div>
    )
}

export default Camera
