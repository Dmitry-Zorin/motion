import Human from "./Human"
import Train from "./Train"

const CameraObjects = ({index, large, height}) => {
    return (
        <>
            <Train {...{large}}/>
            <Human {...{index, large, height}}/>
        </>
    )
}

export default CameraObjects
