import {useState} from "react"
import Human from "./Human"
import Train from "./Train"

const CameraObjects = ({index, large, height}) => {
    const [isCloseToDoors, setIsCloseToDoors] = useState(false)

    return (
        <>
            <Train {...{large, isCloseToDoors}}/>
            <Human {...{index, large, height, setIsCloseToDoors}}/>
        </>
    )
}

export default CameraObjects
