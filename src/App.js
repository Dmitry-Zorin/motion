import {Grid} from "@material-ui/core"
import {AnimatePresence, AnimateSharedLayout} from "framer-motion";
import {useState} from "react"
import './App.css'
import Camera from "./Camera"
import CameraCard from "./CameraCard"

const cameras = [
    {name: 'Camera 1'},
    {name: 'Camera 2'},
    {name: 'Camera 3'},
    {name: 'Camera 4'}
]

const App = () => {
    const [element, setElement] = useState()
    const [activeCamera, setActiveCamera] = useState()

    return (
        <div className="App">
            <AnimateSharedLayout type='crossfade'>
                <Grid container spacing={5} style={{width: 1600, margin: 'auto'}}>
                    {cameras.map((c, i) => (
                        <Grid item xs={6}>
                            <CameraCard key={i} index={i} name={c.name} {...{setActiveCamera}}/>
                        </Grid>
                    ))}
                </Grid>
                <AnimatePresence>
                    {typeof activeCamera === 'number' && (
                        <Camera
                            index={activeCamera}
                            camera={cameras[activeCamera]}
                            {...{setActiveCamera, element, setElement}}
                        />
                    )}
                </AnimatePresence>
            </AnimateSharedLayout>
        </div>
    )
}

export default App
