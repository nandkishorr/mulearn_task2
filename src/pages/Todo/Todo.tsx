import React, { useState, useEffect } from 'react';
import { AiOutlinePoweroff ,AiOutlineFolderAdd,AiOutlineDelete} from 'react-icons/ai';
import{GrSave} from 'react-icons/gr';
import{FcCancel}from'react-icons/fc';
import"./Todo.css"
import { BsCheck2Circle } from 'react-icons/bs';
import {GrUpdate} from 'react-icons/gr';

interface Todo {
  id: number;
  text: string;
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
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodoStatus = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const updateTodo = () => {
    if (newTodo.trim() === '') return;
    const updatedTodos = todos.map((todo) =>
      todo.id === selectedTodo!.id ? { ...todo, text: newTodo } : todo
    );
    setTodos(updatedTodos);
    setSelectedTodo(null);
    setNewTodo('');
  };

  const cancelUpdate = () => {
    setSelectedTodo(null);
    setNewTodo('');
  };

  return (
    <div className="todo-container container-fluid">
     <div className='logout'><AiOutlinePoweroff  size='2em' onClick={handleLogout}/></div>
     <div className='d-flex todo-top'> 
     <h2 className='todo-heading '>ToDos</h2><BsCheck2Circle/></div>
     
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
          <GrSave size='2em' color='white' cursor='pointer' onClick={updateTodo}/>
          <FcCancel size='2em' color='white' cursor='pointer' onClick={cancelUpdate}/>
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
          <AiOutlineFolderAdd size='30px' color='white' cursor='pointer' onClick={addTodo}/>
          </>
        )}
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
              {todo.text}
            </span>
            {!selectedTodo ? (
             <div className='btns'><GrUpdate size="20px"onClick={() => setSelectedTodo(todo)}/>
             <AiOutlineDelete size="25px" color="red"onClick={() => deleteTodo(todo.id)}/></div> 
            ) : (
             <GrUpdate  disabled size="20px"onClick={() => setSelectedTodo(todo)}/>
            )}
           
          </li>
        ))}
      
      
    </ul></div>
      
    </div>
    
  );
};

export default Todo;