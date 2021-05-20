import {Grid, makeStyles} from "@material-ui/core"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import {AnimatePresence, AnimateSharedLayout} from "framer-motion"
import {useState} from "react"
import './App.css'
import Camera from "./Camera"
import CameraLarge from "./CameraLarge"
import Navigator from "./Navigator"

const theme = createMuiTheme({
    typography: {fontFamily: 'Nunito'}
})

const cams = [...Array(16).keys()].map((_, i) => ({name: 'Camera ' + (i + 1)}))

const useStyles = makeStyles((theme) => ({
    container: {
        paddingRight: theme.spacing(4)
    }
}))

const App = () => {
    const classes = useStyles()
    const [activeCam, setActiveCam] = useState()

    return (
        <ThemeProvider theme={theme}>
            <div className={`App ${classes.container}`}>
                <Navigator>
                    <AnimateSharedLayout type='crossfade'>
                        <Grid container spacing={4} style={{maxWidth: 1600, margin: 'auto'}}>
                            {cams.map((c, i) => (
                                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                                    <Camera index={i + 1} {...{setActiveCam}}/>
                                </Grid>
                            ))}
                        </Grid>
                        <AnimatePresence>
                            {activeCam && (
                                <CameraLarge
                                    index={activeCam}
                                    cam={cams[activeCam - 1]}
                                    {...{setActiveCam}}
                                />
                            )}
                        </AnimatePresence>
                    </AnimateSharedLayout>
                </Navigator>
            </div>
        </ThemeProvider>
    )
}

export default App
