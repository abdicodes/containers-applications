import React, { useEffect, useState } from 'react'
import axios from '../util/apiClient'

import List from './List'
import Form from './Form'

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const TodoView = () => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/todos`)
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/todos`, todo)
    setTodos([...todos, data])
  }

  const deleteTodo = async (todo) => {
    await axios.delete(`${REACT_APP_BACKEND_URL}/todos/${todo._id}`)
    refreshTodos()
  }

  const completeTodo = async (todo) => {
    await axios.put(`${REACT_APP_BACKEND_URL}/todos/${todo._id}`, {
      text: todo.text,
      done: true,
    })
    refreshTodos()
  }

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  )
}

export default TodoView
