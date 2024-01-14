// import use state hook
import { useState, useEffect } from 'react'

// import components
import Header from "./components/Header"
import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList";

function App() {
  // initalize todo state
  const [todos, setTodos] = useState([])

  // fetch todos using useEffect hook 
  useEffect(() => {
    const loadTodos = async () => {
      const todosData = await getTodos()
      console.log(todosData);
      setTodos(todosData)
    }

    loadTodos()
  }, [])

  // fetch and return todos from json server 
  const getTodos = async () => {
    const response = await fetch('http://localhost:5000/todos')
    const data = await response.json()

    return data
  }

  // get single todo item by id from json server
  const getTodo = async (id) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`)
    const todo = await response.json()
    console.log(todo)

    return todo
  }

  // add todo
  const handleAddTodo = async (newTodo) => {
    // post request to json server
    const response = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newTodo)
    })

    // recieve the newly added todo
    const newTodoResponse = await response.json();
    // set new todo to state
    setTodos([...todos, newTodoResponse]);
  }

  // delete todo
  const handleDeleteTodo = async (id) => {
    // delete todo from db.json
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    })

    // filter out the todo item with matching id
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // mark as todo as priority
  const updatePriority = async (id) => {
    // fetch todo to update from json server
    const todoItem = await getTodo(id)
    console.log(todoItem)
    // reverse the existing priority value and set it to new object
    const updatedTodo = { ...todoItem, priority: !todoItem.priority }

    // update todo priority status on json server
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    })

    // recive updated todo from json server
    const todoData = await response.json()

    setTodos(todos.map((todo) => {
      // check for todo id match and modify priority status else return todo
      return todo.id === id ? { ...todo, priority: todoData.priority } : todo
    }))
  }

  return (
    <div className="App">
      {/* pass title as a prop */}
      <Header title="Todo App" />
      {/* pass handleAddTodo function reference as a prop */}
      <AddTodo onAdd={handleAddTodo} />
      {/* condtionally render todo list component*/}
      {todos.length > 0
        // pass in todos data and event handler functions as props
        ? <TodoList todos={todos} onDelete={handleDeleteTodo} onUpdate={updatePriority} />
        : <p style={{ textAlign: 'center' }}>No Todos Added</p>}
    </div>
  )
}

export default App;
