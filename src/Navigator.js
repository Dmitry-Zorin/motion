import {useEffect, useState} from "react"
import CoordsContext from "./CoordsContext"

let isMoving = false
const numberOfPeople = 5
let globCoords = [...Array(16).keys()].map(_ => ([...Array(numberOfPeople).keys()].map(_ => ({x: 0.5, y: 0.5}))))

const getRandomCoord = (coord) => (
    Math.min(Math.max(coord + Math.random() / 10 * (-1) ** (Math.random() > 0.5), 0), 1)
)

const Navigator = ({children}) => {
    const [coords, setCoords] = useState(globCoords)

    useEffect(() => {
        if (!isMoving) {
            isMoving = true
            const interval = setInterval(() => {
                setCoords(globCoords = globCoords.map(arr => arr.map(c => ({
                    x: getRandomCoord(c.x),
                    y: getRandomCoord(c.y)
                }))))
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [])

    return (
        <CoordsContext.Provider value={coords}>
            {children}
        </CoordsContext.Provider>
    )
}

export default Navigator
