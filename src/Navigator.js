import { useEffect, useState } from 'react'
import { numberOfCameras, numberOfPeople } from './constants'
import CoordsContext from './CoordsContext'

let globCoords = [...Array(numberOfCameras).keys()].map((_) =>
	[...Array(numberOfPeople).keys()].map((_) => ({
		x: 0.25 + 0.5 * Math.random(),
		y: 0.25 + 0.5 * Math.random(),
	})),
)

const getRandomCoord = (coord) =>
	Math.min(
		Math.max(coord + (Math.random() / 10) * (-1) ** (Math.random() > 0.5), 0),
		1,
	)

const Navigator = ({ children }) => {
	const [coords, setCoords] = useState(globCoords)

	const updateCoords = () => {
		setCoords(
			(globCoords = globCoords.map((arr) =>
				arr.map((c) => ({
					x: getRandomCoord(c.x),
					y: getRandomCoord(c.y),
				})),
			)),
		)
	}

	useEffect(() => {
		setTimeout(updateCoords, 0)
		const interval = setInterval(updateCoords, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<CoordsContext.Provider value={coords}>{children}</CoordsContext.Provider>
	)
}

export default Navigator
