import { FaTimes } from 'react-icons/fa'

function TodoItem({ todo, onDelete, onUpdate }) {
  return (
    // conditonally add priority class
    <div className={`todo ${todo.priority ? 'priority' : ''}`} onDoubleClick={() => onUpdate(todo.id)}>
      <h4>{todo.text}</h4>
      {/* delete todo icon */}
      <FaTimes onClick={() => onDelete(todo.id)} style={{ color: 'crimson', cursor: 'pointer' }} />
    </div>
  )
}

export default TodoItem