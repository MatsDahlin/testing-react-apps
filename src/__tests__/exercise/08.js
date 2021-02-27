// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
const Counter = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the fake count and increment/decrement functions', () => {
  let fakeResult
  const FakeCounter = () => {
    fakeResult = useCounter()
    return null
  }

  render(<FakeCounter />)

  expect(fakeResult.count).toBe(0)

  act(() => fakeResult.increment())
  act(() => fakeResult.increment())

  expect(fakeResult.count).toBe(2)
})

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)

  const countElement = screen.getByText(/count:/i)
  const incButton = screen.getByRole('button', {name: /increment/i})
  const decButton = screen.getByRole('button', {name: /decrement/i})

  expect(countElement).toHaveTextContent('Count: 0')
  userEvent.click(incButton)
  userEvent.click(incButton)

  expect(countElement).toHaveTextContent('Count: 2')

  userEvent.click(decButton)

  expect(countElement).toHaveTextContent('Count: 1')
})

/* eslint no-unused-vars:0 */
