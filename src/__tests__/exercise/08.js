// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'
import {renderHook} from '@testing-library/react-hooks'

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
  let {result} = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  act(() => result.current.increment())

  expect(result.current.count).toBe(2)
})

test('allows customization of the initial count', () => {
  let {result} = renderHook(() => useCounter({initialCount: 3}))

  expect(result.current.count).toBe(3)

  act(() => result.current.increment())
  act(() => result.current.increment())

  expect(result.current.count).toBe(5)
})

test('allows customization of the step', () => {
  let {result} = renderHook(() => useCounter({step: 2}))

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  act(() => result.current.increment())

  expect(result.current.count).toBe(4)
})

/* eslint no-unused-vars:0 */
