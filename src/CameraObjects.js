import {useState} from "react"
import Human from "./Human"
import Train from "./Train"
import {numberOfPeople} from "./constants"

const CameraObjects = ({index, large, height, width}) => {
    const [isCloseToDoors, setIsCloseToDoors] = useState([...Array(numberOfPeople).keys()].map(() => false))

    return (
        <div style={{width: '160vh'}}>
            <Train {...{large, height, isCloseToDoors}}/>
            {isCloseToDoors.map((_, i) => (
                <Human key={i} num={i} {...{index, large, height, width, setIsCloseToDoors}}/>
            ))}
        </div>
    )
}

export default CameraObjects
