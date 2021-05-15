import {IconButton, Typography} from "@material-ui/core"
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor"

const GUI = ({title, animation, zoom, setZoom}) => (
    <div
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
                Zoom: {Math.floor(zoom / 5) * 5}%
            </Typography>
        </div>
    </div>
)

export default GUI
