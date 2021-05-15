import {motion} from "framer-motion"

const width = 100
const border = 8

const Bus = ({x = `calc(96vh - ${width + border}px)`, y = 0}) => (
    <motion.div
        style={{
            x, y, width,
            height: '100%',
            borderLeft: `${border}px solid rgba(255, 0, 0, 0.4)`,
            background: 'rgba(255, 0, 0, 0.2)',
            position: 'absolute'
        }}
    />
)

export default Bus
