import React, { useState, useEffect } from 'react';
import { AiOutlinePoweroff, AiOutlineFolderAdd, AiOutlineDelete } from 'react-icons/ai';

import "./Todo.css";
import { BsCheck2Circle } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {
  handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Todo = ({ handleLogout }: TodoProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/todo/', {
        method: 'GET', 
      headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        
      });
      if (response.ok) {
        const todosData = await response.json();
        const todosWithId = todosData.map((todo: Todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        }));
        setTodos(todosWithId);
      } else {
        throw new Error('Failed to fetch todos');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/todo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ title: newTodo }),
      });
      if (response.ok) {
        const createdTodo = await response.json();
        setTodos([...todos, createdTodo]);
        setNewTodo('');
      } else {
        throw new Error('Failed to create todo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`https://mulearn-internship-task-production.up.railway.app/api/todo/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodoStatus = async (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      const response = await fetch(`https://mulearn-internship-task-production.up.railway.app/api/todo/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        
      });
      if (!response.ok) {
        throw new Error('Failed to update todo status');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="todo-container container-fluid">
      <div className='container-top'>
        <div className='logout'>
          <AiOutlinePoweroff size='2em' onClick={handleLogout} />
        </div>
        <div className='d-flex todo-top'>
          <h2 className='todo-heading'>ToDos</h2>
          <BsCheck2Circle />
        </div>
        <div className="todo-input-container d-flex">
          {selectedTodo ? (
            <>
              <input
                type="text"
                placeholder="Update Todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="todo-input"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="New Todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="todo-input"
              />
              <AiOutlineFolderAdd size='30px' color='white' cursor='pointer' onClick={createTodo} />
            </>
          )}
        </div>
      </div>
      <div className="todo-main d-flex">
        <ul className='todo-list'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <span
                onClick={() => toggleTodoStatus(todo.id)}
                className="todo-text"
              >
                {todo.title}
              </span>
              {!selectedTodo ? (
                <div className='btns'>
                  <GrUpdate size="20px" onClick={() => setSelectedTodo(todo)} />
                  <AiOutlineDelete size="25px" color="red" onClick={() => deleteTodo(todo.id)} />
                </div>
              ) : (
                <GrUpdate disabled size="20px" onClick={() => setSelectedTodo(todo)} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
