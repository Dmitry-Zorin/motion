import VideocamIcon from '@mui/icons-material/Videocam'
import {
	Box,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { motion, useAnimation } from 'framer-motion'
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import './Camera.css'
import CameraObjects from './CameraObjects'

const Camera = ({ index, setActiveCam, video }) => {
	const cam = useRef()
	const [height, setHeight] = useState()
	const animation = useAnimation()
	const [pageLoaded, setPageLoaded] = useState(false)
	const theme = useTheme()
	const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

	const resize = useCallback(() => {
		if (!pageLoaded) return setPageLoaded(true)
		const offsetHeight = (cam.current.offsetWidth * 9) / 16
		cam.current.style.height = offsetHeight + 'px'
		setHeight(offsetHeight)
	}, [pageLoaded])

	useEffect(resize, [resize])

	useLayoutEffect(() => {
		window.addEventListener('resize', resize)
		return () => window.removeEventListener('resize', resize)
	}, [resize])

	return (
		pageLoaded && (
			<Box
				component={motion.div}
				ref={cam}
				className={`Camera`}
				onMouseOver={() => animation.start({ scale: 1.05 })}
				onMouseOut={() => animation.start({ scale: 1 })}
				onClick={() => isMdUp && setActiveCam(index)}
				animate={animation}
				layoutId={index}
				sx={(theme) => ({
					boxShadow: theme.shadows[2],
					'&:hover': {
						boxShadow: theme.shadows[4],
						'& .title': {
							opacity: 1,
						},
					},
				})}
			>
				{height && <CameraObjects {...{ index, height }} />}
				<IconButton
					className={`overlay`}
					onClick={() => {
						if (!isMdUp) return
						setActiveCam(index)
						video.value = true
					}}
					sx={{
						position: 'absolute',
						bottom: 9,
						right: 16,
						opacity: 0.8,
						transition: 'all 0.2s ease',
						'&:hover': {
							background: 'rgba(0, 0, 0, 0.15) !important',
							opacity: '1 !important',
						},
					}}
				>
					<VideocamIcon />
				</IconButton>
				<Typography
					className="title"
					sx={{
						position: 'absolute',
						bottom: 16,
						left: 0,
						right: 0,
						textAlign: 'center',
						fontWeight: 500,
						fontSize: 16,
						pointerEvents: 'none',
						opacity: 0.6,
					}}
				>
					Камера {index}
				</Typography>
			</Box>
		)
	)
}

export default Camera
