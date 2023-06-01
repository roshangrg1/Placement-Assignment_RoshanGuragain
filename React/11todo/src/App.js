import React, { useReducer, useState } from 'react';
import './App.css'
const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const App = () => {
  const [todoText, setTodoText] = useState('');
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: todoText });
      setTodoText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleRemoveTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <div className='App'>
      <div className='container'>
      <h1>Todo App</h1>
      <form onSubmit={handleAddTodo}>
        <input className='input-text' type="text" value={todoText} onChange={handleInputChange} />
        <button className='btn-add-to-do' type="submit">Add Todo</button>
      </form>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleRemoveTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default App;
