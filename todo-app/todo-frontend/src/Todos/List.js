import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos
        .map((todo) => {
          return (
            <Todo
              todo={todo}
              del={onClickDelete}
              complete={onClickComplete}
              key={todo._id}
            />
          )
        })
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
