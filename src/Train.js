import {motion} from "framer-motion"

const Train = ({large}) => (
    <motion.div
        style={{
            width: '100%',
            height: large ? 100 : 25,
            borderBottom: (large ? 12 : 3) + 'px solid #BC4B51',
            background: '#C27779',
            position: 'absolute'
        }}
    />
)

export default Train
