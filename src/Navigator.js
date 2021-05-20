import {useEffect, useRef, useState} from "react"
import CoordsContext from "./CoordsContext"

const Navigator = ({children}) => {
    const isMoving = useRef(false)
    const [coords, setCoords] = useState({x: 0.5, y: 0.5})

    useEffect(() => {
        if (!isMoving.current) {
            isMoving.current = true
            const interval = setInterval(() => {
                setCoords({
                    x: Math.random(),
                    y: Math.random()
                })
            }, 3000)
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
