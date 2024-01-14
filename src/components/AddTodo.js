import { useState } from 'react'

function AddTodo({ onAdd }) {
  // setup state to hold form input values
  const [todoText, setTodoText] = useState('')

  // handle form submission
  const handleSumbit = (e) => {
    e.preventDefault()

    // input field validation
    if (!todoText) {
      alert('Please enter todo!')
      return
    }

    // create new todo object
    const newTodo = {
      text: todoText,
      priority: false
    }
    // pass todo object to handleAddTodo
    onAdd(newTodo)
    // reset input field
    setTodoText('');
  }

  return (
    <form className="add-todo-form" onSubmit={handleSumbit}>
      <div className="form-control">
        {/* bind data between state and input value */}
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter Todo"
        />
      </div>
      <button type="submit" className="btn">Add Todo</button>
    </form>
  )
}

export default AddTodo