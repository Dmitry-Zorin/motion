import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './fonts/Golos-Text/Golos-Text.css'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)
