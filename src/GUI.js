import ZoomOut from '@mui/icons-material/ZoomOut'
import { IconButton, Typography } from '@mui/material'

const GUI = ({ title = 'Камера', animation, zoom, setZoom }) => (
	<div
		style={{
			position: 'absolute',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			top: 20,
			left: 40,
			right: 40,
			color: 'white',
			zIndex: 1000,
			pointerEvents: 'none',
		}}
		onClick={(e) => e.stopPropagation()}
	>
		<Typography variant="h4">{title}</Typography>
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<IconButton
				style={{
					color: 'white',
					pointerEvents: 'all',
					opacity: zoom > 100 ? 1 : 0,
				}}
				onClick={() => {
					animation.start({
						x: 0,
						y: 0,
						scale: 1,
						cursor: 'zoom-in',
					})
					setZoom(100)
				}}
			>
				<ZoomOut fontSize="large" />
			</IconButton>
			<Typography variant="h4">Увеличение: {zoom}%</Typography>
		</div>
	</div>
)

export default GUI
