import { Box, createTheme, Grid, Hidden, ThemeProvider } from '@mui/material'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useEffect, useState } from 'react'
import './App.css'
import Camera from './Camera'
import CameraLarge from './CameraLarge'
import { numberOfCameras } from './constants'
import noCamera from './images/no_camera.png'
import rgd from './images/rgd.png'
import Navigator from './Navigator'

const theme = createTheme({
	typography: {
		fontFamily:
			'Golos Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
	},
})

const cams = [...Array(numberOfCameras).keys()].map((_, i) => ({
	name: 'Камера ' + (i + 1),
}))
const video = { value: false }

const Title = () => (
	<div className="Title">
		<img src={rgd} className="Logo" alt="logo" />
	</div>
)

const App = () => {
	const [activeCam, setActiveCam] = useState()

	useEffect(() => {
		document.body.style.overflowY = activeCam ? 'hidden' : 'scroll'
	}, [activeCam])

	return (
		<ThemeProvider theme={theme}>
			<Box
				className="App"
				sx={(theme) => ({
					padding: theme.spacing(4),
					minHeight: `100vh`,
					boxSizing: 'border-box',
				})}
			>
				<Navigator>
					<LayoutGroup>
						<Grid container spacing={4} style={{ maxWidth: 2000 }}>
							<Hidden lgUp>
								<Grid item xs={12}>
									<Title />
								</Grid>
							</Hidden>
							<Grid item xs={12} sm={6} lg={3}>
								<Camera index={1} cam={cams[0]} {...{ setActiveCam, video }} />
							</Grid>
							<Hidden lgDown>
								<Grid item lg={6}>
									<Title />
								</Grid>
							</Hidden>
							<Grid item xs={12} sm={6} lg={3}>
								<Camera index={2} cam={cams[1]} {...{ setActiveCam, video }} />
							</Grid>
							{cams.slice(2).map((c, i) => (
								<Grid item key={i} xs={12} sm={6} lg={3}>
									<Camera index={i + 3} cam={c} {...{ setActiveCam, video }} />
								</Grid>
							))}
						</Grid>
						<AnimatePresence>
							{activeCam && (
								<CameraLarge
									index={activeCam}
									cam={cams[activeCam - 1]}
									{...{ setActiveCam, video }}
								/>
							)}
						</AnimatePresence>
					</LayoutGroup>
				</Navigator>
			</Box>
			<img src={noCamera} style={{ display: 'none' }} alt="" />
		</ThemeProvider>
	)
}

export default App
