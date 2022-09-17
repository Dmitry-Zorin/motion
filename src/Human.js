import FaceIcon from '@mui/icons-material/Face'
import { motion } from 'framer-motion'
import { useContext, useEffect } from 'react'
import CoordsContext from './CoordsContext'

const Human = ({ num, index, height, width, large, setIsCloseToDoors }) => {
	let { x, y } = useContext(CoordsContext)[index - 1][num]
	let size, diff

	if (large) {
		size = 60
		diff = 6
	} else {
		size = 15
		diff = 3
	}

	height = height || 0.9 * window.innerHeight
	width = Math.min((16 / 9) * height, 0.9 * window.innerWidth)

	x = x * width - size / 2 + diff
	y = y * height - size / 2 + diff

	useEffect(() => {
		setIsCloseToDoors((e) => {
			const newE = [...e]
			newE[num] = y < height / 6
			return newE[num] === e[num] ? e : newE
		})
	}, [height, num, setIsCloseToDoors, y])

	return (
		<motion.div
			style={{
				x,
				y,
				width: size,
				height: size,
				borderRadius: '100%',
				background: 'white',
				transition: 'transform 0.97s linear',
				position: 'absolute',
			}}
		>
			<FaceIcon
				style={{
					transform: `translate(-${diff}px, -${diff}px)`,
					fontSize: size + 2 * diff,
				}}
			/>
		</motion.div>
	)
}

export default Human
