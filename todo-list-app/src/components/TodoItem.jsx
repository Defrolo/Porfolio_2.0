import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text" onClick={() => onToggle(todo.id)}>
          {todo.text}
        </span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Eliminar
      </button>
    </li>
  );
};

export default TodoItem;
