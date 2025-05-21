import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete }) => {
  // Verificar que los datos recibidos sean correctos
  console.log("TodoList recibió:", todos.length, "tareas");

  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-message">No hay tareas en esta categoría</p>
      ) : (
        todos.map((todo) => {
          console.log(
            "Renderizando tarea:",
            todo.id,
            todo.text,
            "completada:",
            todo.completed
          );
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          );
        })
      )}
    </ul>
  );
};

export default TodoList;
