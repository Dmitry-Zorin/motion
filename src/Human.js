import FaceIcon from "@material-ui/icons/Face"
import {motion} from "framer-motion"
import {useContext} from "react"
import CoordsContext from "./CoordsContext"

const Human = ({index, height = 0.9 * window.innerHeight, large}) => {
    let {x, y} = useContext(CoordsContext)[index - 1]

    const size = large ? 30 : 15
    const diff = large ? 6 : 3

    x = x * 16 / 9 * height - size / 2 + diff
    y = y * height - size / 2 + diff

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
