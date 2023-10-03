import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'

describe('App component', () => {
    it('should render "Global Cooling" text', () => {
        render(<App/>)
        const textElement = screen.getByText(/Hello WebSocket!/i)
        expect(textElement).toBeInTheDocument()
    })
})