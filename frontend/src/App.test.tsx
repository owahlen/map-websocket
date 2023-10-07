import React from 'react'
import {render, screen} from '@testing-library/react'
import {App} from './App'

describe('App component', () => {
    it('should render "WebSocket State', () => {
        render(<App/>)
        const textElement = screen.getByText(/WebSocket State/i)
        expect(textElement).toBeInTheDocument()
    })
})