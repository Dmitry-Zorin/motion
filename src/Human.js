import FaceIcon from "@material-ui/icons/Face"
import {motion} from "framer-motion"
import {useContext} from "react"
import CoordsContext from "./CoordsContext"

const Human = ({index, height = 0.9 * window.innerHeight, large, setIsCloseToDoors}) => {
    let {x, y} = useContext(CoordsContext)[index - 1]
    let size, diff, trainHeight

    if (large) {
        size = 30
        diff = 6
        trainHeight = 115
    } else {
        size = 15
        diff = 3
        trainHeight = 30
    }

    x = x * 16 / 9 * height - size / 2 + diff
    y = y * height - size / 2 + diff

    setIsCloseToDoors(y < trainHeight)

    return (
        <motion.div
            style={{
                x, y,
                width: size,
                height: size,
                borderRadius: '100%',
                background: 'white',
                transition: 'transform 1s linear',
                position: 'absolute'
            }}
        >
            <FaceIcon
                style={{
                    transform: `translate(-${diff}px, -${diff}px)`,
                    fontSize: size + 2 * diff,
                }}
            />
        </motion.div>
    )
}

export default Human
