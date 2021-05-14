import {IconButton, Typography} from "@material-ui/core"
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor"
import {motion} from "framer-motion";

const GUI = ({title, animation, zoom, setZoom}) => (
    <motion.div
        style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            top: 20,
            left: 40,
            right: 40,
            color: 'white',
            zIndex: 1000
        }}
        onClick={e => e.stopPropagation()}
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0
        }}
    >
        <Typography variant='h4'>
            {title}
        </Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <IconButton style={{color: 'white'}} component='div' onClick={() => {
                animation.start({
                    scale: 1,
                    x: 0,
                    y: 0,
                    transition: {
                        type: 'spring',
                        bounce: 0,
                        duration: 0.4
                    }
                })
                setZoom(100)
            }}>
                <YoutubeSearchedForIcon fontSize='large'/>
            </IconButton>
            <Typography variant='h4'>
                {Math.floor(zoom / 5) * 5}%
            </Typography>
        </div>
    </motion.div>
)

export default GUI
