import {Grid, Hidden, makeStyles} from "@material-ui/core"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import {AnimatePresence, AnimateSharedLayout} from "framer-motion"
import {useEffect, useState} from "react"
import './App.css'
import Camera from "./Camera"
import CameraLarge from "./CameraLarge"
import Navigator from "./Navigator"
import {numberOfCameras} from "./constants"
import noCamera from "./images/no_camera.png"
import rgd from './images/rgd.png'

const theme = createMuiTheme({
    typography: {fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'},
})

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        minHeight: `calc(100vh - ${2 * theme.spacing(4)}px)`
    }
}))

const cams = [...Array(numberOfCameras).keys()].map((_, i) => ({name: 'Камера ' + (i + 1)}))
const video = {value: false}

const Title = () => (
    <div className='Title'>
        <img src={rgd} className='Logo' alt='logo'/>
    </div>
)

const App = () => {
    const classes = useStyles()
    const [activeCam, setActiveCam] = useState()

    useEffect(() => {
        document.body.style.overflowY = activeCam ? 'hidden' : 'scroll'
    }, [activeCam])

    return (
        <ThemeProvider theme={theme}>
            <div className={`${classes.container} App`}>
                <Navigator>
                    <AnimateSharedLayout type='crossfade'>
                        <Grid container spacing={4}>
                            <Hidden lgUp>
                                <Grid item xs={12}>
                                    <Title/>
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} sm={6} lg={3}>
                                <Camera index={1} cam={cams[0]} {...{setActiveCam, video}}/>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item lg={6}>
                                    <Title/>
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} sm={6} lg={3}>
                                <Camera index={2} cam={cams[1]} {...{setActiveCam, video}}/>
                            </Grid>
                            {cams.slice(2).map((c, i) => (
                                <Grid item key={i} xs={12} sm={6} lg={3}>
                                    <Camera index={i + 3} cam={c} {...{setActiveCam, video}}/>
                                </Grid>
                            ))}
                        </Grid>
                        <Hidden smDown>
                            <AnimatePresence>
                                {activeCam && (
                                    <CameraLarge
                                        index={activeCam}
                                        cam={cams[activeCam - 1]}
                                        {...{setActiveCam, video}}
                                    />
                                )}
                            </AnimatePresence>
                        </Hidden>
                    </AnimateSharedLayout>
                </Navigator>
            </div>
            <img src={noCamera} style={{display: 'none'}} alt=''/>
            <img src='/video_feed' style={{display: 'none'}} alt=''/>
        </ThemeProvider>
    )
}

export default App
