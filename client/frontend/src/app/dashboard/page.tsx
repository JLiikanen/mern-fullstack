'use client'
import { useState } from "react";
import React from 'react'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'

export default function Dashboard(){
    const [isAuthorized, setIsAuthorized] = useState(false);

    // check the user bearer token that the user is authorized for access!
    const token = localStorage.getItem('token');
    console.log("my token", token)
    fetch('http://localhost:3000/api/goals', {
        method: 'GET',
        headers: {
            'authorization': `${token}`
        }
    }) 

    .then(response => {
        if (response.status === 401) {
            console.log(response.text())
            throw Error("Invalid token!")
        } else if (response.status === 200) {
            return;
        }
    })
    .then(data => {
        // Render the data
        setIsAuthorized(true)
    })
    .catch(error => {
        console.error('Error fetching user goals:', error);
    });

    console.log(isAuthorized)

  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string, category: 'work' | 'home' | 'free-time') => {
    setTodos([...todos, { id: Date.now(), text, category, completed: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
    return (
        isAuthorized ? (
    <div className="w-full max-w-2xl mx-auto">
         <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">To-Do Dashboard</h1>
      <div className="mb-12">
        <TodoInput onAddTodo={addTodo} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TodoList 
          title="Work" 
          todos={todos.filter(todo => todo.category === 'work')}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        <TodoList 
          title="Home" 
          todos={todos.filter(todo => todo.category === 'home')}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        <TodoList 
          title="Free-time" 
          todos={todos.filter(todo => todo.category === 'free-time')}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        </div>
      </div>
    </div>
    ) : <h1>Access denied</h1> 
)
}

