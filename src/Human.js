import {Paper} from "@material-ui/core"
import FaceIcon from "@material-ui/icons/Face"
import {motion} from "framer-motion"

const size = 30
const border = 4

const Human = ({x = 'calc(96vh - 120px)', y = '48vh'}) => (
    <motion.div style={{x, y, position: 'relative'}}>
        <Paper
            style={{
                transform: `translate(${border}px, ${border}px)`,
                width: size,
                height: size,
                borderRadius: '100%',
                background: 'white',
                position: 'absolute',
            }}/>
        <FaceIcon
            style={{
                fontSize: size + 2 * border,
                position: 'absolute'
            }}
        />
    </motion.div>
)

export default Human
