import {useState} from "react"
import Human from "./Human"
import Train from "./Train"
import {numberOfPeople} from "./constants"

const CameraObjects = ({index, large, height}) => {
    const [isCloseToDoors, setIsCloseToDoors] = useState([...Array(numberOfPeople).keys()].map(() => false))

    return (
        <div style={{width: '160vh'}}>
            <Train {...{large, isCloseToDoors}}/>
            {isCloseToDoors.map((_, i) => (
                <Human key={i} num={i} {...{index, large, height, setIsCloseToDoors}}/>
            ))}
        </div>
    )
}

export default CameraObjects
