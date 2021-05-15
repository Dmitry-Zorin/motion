import {Card, makeStyles, Typography} from "@material-ui/core"
import {motion} from "framer-motion"

const MotionTypography = motion(Typography, {forwardMotionProps: true})

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: theme.shadows[2],
        '&:hover': {
            boxShadow: theme.shadows[4]
        }
    }
}))

const CameraCard = ({index, name, setActiveCamera}) => {
    const classes = useStyles()

    return (
        <motion.div
            style={{fontWeight: 200}}
            layoutId={index}
            onClick={() => setActiveCamera(index)}
            whileHover={{scale: 1.05, fontWeight: 600}}
        >
            <Card
                className={classes.card}
                style={{
                    height: 200,
                    borderRadius: 10,
                    background: '#DAD9DB',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <MotionTypography style={{fontSize: 26, fontWeight: 'inherit'}}>
                    {name}
                </MotionTypography>
            </Card>
        </motion.div>
    )
}

export default CameraCard
