import { useState } from "react"

import TodoItem from "./TodoItem"

function TodoList({ todos, onDelete, onUpdate }) {
  return (
    <div className="todo-list">
      {/* iterate through todos and output TodoItem component */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default TodoList