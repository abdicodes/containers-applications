import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

const todo1 = {
  done: false,
  text: 'Hello world 4',
  _id: '64358d1b9f8575c27d3bcc32',
}

const todo2 = {
  done: true,
  text: 'Hello world 5',
  _id: '64358d1b9f8575c27d3bcc33',
}

test('expect todo text and this todo is not done to be rendered', () => {
  const mockHander = jest.fn()
  render(<Todo todo={todo1} del={mockHander} complete={mockHander} />)

  const text = screen.queryByText('Hello world 4')
  const status = screen.queryByText('This todo is not done')
  expect(text).toBeDefined()
  expect(status).toBeDefined()
})
test('check if author and likes are rendered after view button click', () => {
  const mockHander = jest.fn()
  render(<Todo todo={todo2} del={mockHander} complete={mockHander} />)

  const text = screen.queryByText('Hello world 5')
  const status = screen.queryByText('This todo is not done')
  expect(text).toBeDefined()
  expect(status).toBeNull()
})
