import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

describe('App', () => {
  // Test to check if the main heading is rendered
  test('renders main heading', () => {
    render(<App />)
    const headingElement = screen.getByRole('heading', {
      name: /Vite \+ React/i,
    })
    expect(headingElement).toBeInTheDocument()
  })

  // Test to check if the initial count is 0
  test('renders button with initial count of 0', () => {
    render(<App />)
    const counterButton = screen.getByRole('button', { name: /count is 0/i })
    expect(counterButton).toBeInTheDocument()
  })

  // Test to check if the count increments on button click
  test('increments count on button click', () => {
    render(<App />)
    const counterButton = screen.getByRole('button', { name: /count is 0/i })

    fireEvent.click(counterButton)
    expect(
      screen.getByRole('button', { name: /count is 1/i }),
    ).toBeInTheDocument()

    fireEvent.click(counterButton)
    expect(
      screen.getByRole('button', { name: /count is 2/i }),
    ).toBeInTheDocument()
  })

  // Test to check if the Vite and React logos are present
  test('renders Vite and React logos', () => {
    render(<App />)
    const viteLogo = screen.getByAltText('Vite logo')
    const reactLogo = screen.getByAltText('React logo')

    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })

  // Test to check if the "Click on the Vite and React logos..." text is present
  test('renders learn more text', () => {
    render(<App />)
    const learnMoreText = screen.getByText(
      /Click on the Vite and React logos to learn more/i,
    )
    expect(learnMoreText).toBeInTheDocument()
  })
})
