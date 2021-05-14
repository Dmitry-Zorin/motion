import {Card, Typography} from "@material-ui/core"
import {motion} from "framer-motion"

const CameraCard = ({index, name, setActiveCamera}) => {
    return (
        <motion.div layoutId={index} onClick={() => setActiveCamera(index)} layout>
            <Card style={{height: 300}}>
                <Typography>
                    {name}
                </Typography>
            </Card>
        </motion.div>
    )
}

export default CameraCard
