import {makeStyles} from "@material-ui/core"
import {motion, useMotionValue} from "framer-motion"
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
    const scale = useMotionValue(1)
    const cam = useRef()
    const [height, setHeight] = useState()

    useEffect(() => setHeight(cam.current.offsetHeight), [])

    return (
        <motion.div
            ref={cam}
            className={`Camera ${classes.card}`}
            style={{scale}}
            onClick={() => {
                setActiveCam(index)
                scale.set(1)
            }}
            whileHover={{scale: 1.05}}
            layoutId={index}
        >
            {height && (
                <CameraObjects {...{index, height}}/>
            )}
        </motion.div>
    )
}

export default Camera
