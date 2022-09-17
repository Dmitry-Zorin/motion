import { Box } from '@mui/material'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './Camera.css'
import './CameraLarge.css'
import CameraObjects from './CameraObjects'
import GUI from './GUI'
import Video from './Video'

const CameraLarge = ({ index, cam, setActiveCam, video }) => {
	const [zoom, setZoom] = useState(100)
	const [element, setElement] = useState()
	const animation = useAnimation()
	const mainArea = useRef()

	useEffect(() => {
		if (!element) return

		const transform = mainArea.current.style.transform

		let [translateX = 0, translateY = 0, , scale = 1] = (
			transform.match(/-?\d+(\.\d+)?/g) || []
		)
			.slice(1, 5)
			.map((e) => +e)

		const newScale = scale * 1.5 ** (-1 * Math.sign(element.deltaY || -1))
		if (newScale < 1) return setElement(null)

		const ratio = 1 - newScale / scale
		let x =
			translateX +
			(element.clientX - window.innerWidth / 2 - translateX) * ratio
		let y =
			translateY +
			(element.clientY - window.innerHeight / 2 - translateY) * ratio
		if (newScale === 1) x = y = 0

		animation
			.start({
				x,
				y,
				scale: newScale,
				cursor: newScale > 1 ? `grab` : `zoom-in`,
			})
			.then(() => {
				setZoom(100 * newScale)
				setElement(null)
			})
	}, [animation, element, setElement])

	return (
		<div className="Container" onWheel={(e) => !element && setElement(e)}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { ease: 'easeIn', duration: 0.4 } }}
				transition={{ ease: 'easeOut', duration: 0.4 }}
			>
				<GUI title={cam.name} {...{ animation, zoom, setZoom }} />
				<motion.div
					className="Container Background"
					onClick={() => {
						animation
							.start({ x: 0, y: 0, scale: 1, transition: { duration: 0 } })
							.then(() => {
								setActiveCam(null)
								video.value = false
							})
					}}
				/>
			</motion.div>
			<Box
				component={motion.div}
				ref={mainArea}
				className="Camera CameraLarge"
				drag={zoom > 100}
				dragMomentum={false}
				animate={animation}
				transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
				layoutId={index}
				onClick={(e) => zoom === 100 && !element && setElement(e)}
				whileDrag={{
					cursor: `grabbing`,
				}}
				whileHover={{
					cursor: zoom > 100 ? `grab` : `zoom-in`,
				}}
				sx={{
					aspectRatio: video.value && 'unset',
					cursor: zoom > 100 ? `grab` : `zoom-in`,
				}}
			>
				{video.value ? (
					<Video {...{ index }} />
				) : (
					<CameraObjects {...{ index }} large />
				)}
			</Box>
		</div>
	)
}

export default CameraLarge
