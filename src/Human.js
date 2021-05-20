import FaceIcon from "@material-ui/icons/Face"
import {motion} from "framer-motion"
import {useContext} from "react"
import CoordsContext from "./CoordsContext"

const Human = ({height, large}) => {
    const coords = useContext(CoordsContext)

    const size = large ? 30 : 15
    const diff = large ? 6 : 3

    let {x, y} = coords

    if (large) {
        x *= 1.6 * window.innerHeight
        y *= 0.9 * window.innerHeight
    } else {
        x *= 16 / 9 * height
        y *= height
    }

    x -= size / 2 + diff
    y -= size / 2 + diff

    return (
        <motion.div
            style={{
                x, y,
                width: size,
                height: size,
                borderRadius: '100%',
                background: 'white',
                transition: 'transform 3s linear'
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
