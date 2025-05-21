import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all, active, completed

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleComplete = (id) => {
    // Actualizar el estado de la tarea con el ID correspondiente
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    // Actualizar el estado con las tareas modificadas
    setTodos(updatedTodos);

    // Cambiar automáticamente a la categoría "Completadas" si la tarea se marcó como completada
    const updatedTodo = updatedTodos.find((t) => t.id === id);
    if (updatedTodo && updatedTodo.completed) {
      setFilter("completed");
    }

    // Registrar el cambio para depuración
    console.log(
      "Tarea actualizada:",
      id,
      "Nuevo estado:",
      updatedTodo?.completed
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filtrar tareas según el filtro seleccionado
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  // Verificar que el filtrado funcione correctamente
  console.log("Filtro actual:", filter);
  console.log(
    "Tareas filtradas:",
    filteredTodos.map((t) => ({
      id: t.id,
      text: t.text,
      completed: t.completed,
    }))
  );

  // Limpiar todas las tareas completadas
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    // Si estamos en el filtro de completadas, cambiar a todas después de limpiar
    if (filter === "completed") {
      setFilter("all");
    }
  };

  return (
    <div className="todo-app">
      <h1>Lista de Tareas</h1>

      <TodoForm onAddTodo={handleAddTodo} />

      <div className="todo-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Pendientes
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completadas
        </button>
        <button className="clear-completed" onClick={handleClearCompleted}>
          Limpiar completadas
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleComplete}
        onDelete={handleDeleteTodo}
      />

      <div className="todo-stats">
        <p>
          Total: {todos.length} | Completadas:{" "}
          {todos.filter((todo) => todo.completed).length}
        </p>
      </div>
    </div>
  );
}

export default App;
