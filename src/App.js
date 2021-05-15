import {Grid} from "@material-ui/core"
import {AnimatePresence, AnimateSharedLayout} from "framer-motion";
import {useState} from "react"
import './App.css'
import Camera from "./Camera"
import CameraCard from "./CameraCard"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"

const theme = createMuiTheme({
    typography: {fontFamily: 'Nunito'}
})

const cameras = [...Array(16).keys()].map((e, i) => ({name: 'Camera ' + (i + 1)}))

const App = () => {
    const [element, setElement] = useState()
    const [activeCamera, setActiveCamera] = useState()

    return (
        <ThemeProvider theme={theme}>
            <div className='App'>
                <AnimateSharedLayout type='crossfade'>
                    <Grid container spacing={5} style={{width: 1600, margin: 'auto'}}>
                        {cameras.map((c, i) => (
                            <Grid item xs={3}>
                                <CameraCard key={i} index={i + 1} name={c.name} {...{setActiveCamera}}/>
                            </Grid>
                        ))}
                    </Grid>
                    <AnimatePresence>
                        {activeCamera && (
                            <Camera
                                index={activeCamera}
                                camera={cameras[activeCamera - 1]}
                                {...{setActiveCamera, element, setElement}}
                            />
                        )}
                    </AnimatePresence>
                </AnimateSharedLayout>
            </div>
        </ThemeProvider>
    )
}

export default App
