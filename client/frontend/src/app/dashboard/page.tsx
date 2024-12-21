'use client'
import { useState, useEffect, createContext} from "react";
import React from 'react'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { inter, poppins, spaceGrotesk, dmSans, montserrat } from "../fonts/fonts"
import { getTodos, postTodo, putTodo, deleteTodo } from "./fetching/apicalls";

export default function Dashboard(){
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    type Todo = {
        _id: string,
        name: string,
        deadline: string,
        isCompleted: boolean,
        category: string,
        postingDate : Date,
        __V : number
      }
      
    // GET USER TODOs
    const [todos, setTodos] = useState<Todo[]>([]);
    
    // APP Context for giving component children's access to the bearer token
    

    // check the user bearer token that the user is authorized for access!
    const token = localStorage.getItem('token'); // pass this down as props PROP-DRILL BABY!!!!!!

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

    if (isAuthorized){
        const tokenContext = createContext(1);
    }
    // using useEffect to only run the get todo ONE time!
    // PROBLEM 
    // remember AUTH thingy, im already calling get once above.


    // THE FOLLOWING CODE IS DOING PROPER STATE MANAGEMENT IN SINGLE SOURCE OF TRUTH
    useEffect(() => {
        const fetchTodos = async () => {
            try {
              const data = await getTodos(token);
              setTodos(data);
            } catch (error) {
              console.error("Error fetching todos:", error);
            }
          };
        fetchTodos(); // Call the async function
    }, [token]); // Dependency array to run on token change


    const handleAddTodo = async (name: string, token : string) => {
        try {
          const newTodo = await postTodo(name, token).then(
            data => {
                setTodos((prevTodos) => [...prevTodos, newTodo]);
            }
          ).catch(error => {
          console.error("Error adding todo:", error);
          })

          
    
      const handleDeleteTodo = async (deleted_id: string, token : string) => {
        try {
          await deleteTodo(deleted_id, token);
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== deleted_id));
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      };
    
      const handleUpdateTodo = async (id: string, token : string) => {
        try {
            // only isCompleted is updated other updates are not supported yet
          const updatedTodo = await putTodo(id, token);
          setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
          );
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      };



    // PROBLEM: request works but they are being spammed all the time!!!! // so i need like to request only on changes!!

    return (
        isAuthorized ? (
    <div className="mx-auto">
        <div className="container mx-auto p-4 max-w-6xl w-full py-24">
            <h1 className={`text-3xl font-bold mb-8 text-center ${montserrat.className}`}>To-Do Dashboard</h1>
                <div className="mb-12">
                    <TodoInput />
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
                    <TodoList 
                    title="Work" 
                    todos={todos.filter(todo => todo.category === 'work')}
                    onToggle={handleUpdateTodo}
                    onDelete={deleteTodo}
                    />
                    <TodoList 
                    title="Home" 
                    todos={todos.filter(todo => todo.category === 'home')}
                    onToggle={handleUpdateTodo}
                    onDelete={deleteTodo}
                    />
                    <TodoList 
                    title="Free-time" 
                    todos={todos.filter(todo => todo.category === 'free-time')}
                    onToggle={handleUpdateTodo}
                    onDelete={deleteTodo}
                    />
                </div>
        </div>
    </div>
    ) : <h1>Access denied</h1> 
)
}

