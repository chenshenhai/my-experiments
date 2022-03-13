
	import { render } from 'react-dom'
	import React from 'react';
	import { Container } from './Container'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'

	function App() {
		return (
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Container />
				</DndProvider>
			</div>
		)
	}

	const rootElement = document.getElementById('app')
	render(<App />, rootElement)
