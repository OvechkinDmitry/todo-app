import React, {useEffect, useState} from 'react';
import {TodoItem} from "../todo-item/todo-item";
import axios from 'axios'
import './todo.css'
import {Toggle} from "../../ui/toggle";
import {TODOS_URL} from "../../utils/constants";


export const Todo = () => {
    const [todos, setTodos] = useState<any>(null)
    const [isServerData, setServerData] = useState<null | boolean>(JSON.parse(localStorage.getItem("isServerData")))
    const [task, setTask] = useState("")


    useEffect(() => {
        if (isServerData)
            axios.get(TODOS_URL)
                .then(({data}) => setTodos(data)).catch((e) => console.log(e))
        else
            setTodos(JSON.parse(localStorage.getItem("todos")))
    }, [isServerData])


    const addTask = () => {
        const newTask = {
            id: Math.floor(Math.random() * 100),
            value: task,
            done: false,
            time: new Date().toLocaleString().replace(",","")
        }
        const newTodos = todos ? [...todos, newTask] : [newTask]
        if (isServerData)
            axios.post(TODOS_URL, newTask).catch((e) => console.log(e))
        else
            localStorage.setItem('todos', JSON.stringify(newTodos))
        setTodos(newTodos)
    }


    const toggleTodo = (id: string) => {
        const newTodos = todos.map(el => {
            if (el.id === id)
                return {...el, done: !el.done}
            return el
        })
        if (isServerData)
            axios.patch(TODOS_URL, {id}).catch((e) => console.log(e))
        else
            localStorage.setItem('todos', JSON.stringify(newTodos))
        setTodos(newTodos)
    }

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter(el => el.id !== id)
        if (isServerData)
            axios.delete(`${TODOS_URL}?id=${id}`).catch((e) => console.log(e))
        else
            localStorage.setItem('todos', JSON.stringify(newTodos))
        setTodos(newTodos)
    }

    const setChecked = (v) => {
        localStorage.setItem('isServerData', JSON.stringify(v))
        setServerData(v)
    }


    return (
        <div className={"todo"}>
            <h1>Add your task</h1>
            <Toggle isChecked={isServerData} setChecked={setChecked}/>
            <div className={'todo__input'}>
                <button onClick={() => {
                    setTask("")
                    addTask()
                }}>+</button>
                <input type={"text"} onInput={(e) => setTask(e.target?.value)} value={task}
                       placeholder={"add new task"}/>
            </div>
            <div className={"todo__todos"}>
                {todos?.map((el, index) =>
                    <TodoItem
                        key={index}
                        id={el.id}
                        value={el.value}
                        done={el.done}
                        time={el.time}
                        deleteItem={deleteTodo}
                        toggleTodo={toggleTodo}/>
                )}
            </div>
        </div>
    );
};

