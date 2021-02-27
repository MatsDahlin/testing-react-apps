// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

function setup({initialProps} = {}) {
  let result = {}
  const FakeCounter = () => {
    result.current = useCounter(initialProps)
    return null
  }

  render(<FakeCounter />)
  return result
}

test('exposes the fake count and increment/decrement functions', () => {
  let fakeResult = setup()

  expect(fakeResult.current.count).toBe(0)

  act(() => fakeResult.current.increment())
  act(() => fakeResult.current.increment())

  expect(fakeResult.current.count).toBe(2)
})

test('allows customization of the initial count', () => {
  let fakeResult = setup({initialProps: {initialCount: 3}})

  expect(fakeResult.current.count).toBe(3)

  act(() => fakeResult.current.increment())
  act(() => fakeResult.current.increment())

  expect(fakeResult.current.count).toBe(5)
})

test('allows customization of the step', () => {
  let fakeResult = setup({initialProps: {step: 2}})

  expect(fakeResult.current.count).toBe(0)

  act(() => fakeResult.current.increment())
  act(() => fakeResult.current.increment())

  expect(fakeResult.current.count).toBe(4)
})

/* eslint no-unused-vars:0 */
