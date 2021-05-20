import {useState} from "react"
import Human from "./Human"
import Train from "./Train"

const numberOfPeople = 5

const CameraObjects = ({index, large, height}) => {
    const [isCloseToDoors, setIsCloseToDoors] = useState([...Array(numberOfPeople).keys()].map(() => false))

    return (
        <>
            <Train {...{large, isCloseToDoors}}/>
            {isCloseToDoors.map((_, i) => (
                <Human key={i} num={i} {...{index, large, height, setIsCloseToDoors}}/>
            ))}
        </>
    )
}

export default CameraObjects
