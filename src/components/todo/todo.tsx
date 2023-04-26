import React from 'react';
import {TodoItem} from "../todo-item/todo-item";
import './todo.css'

export const Todo = () => {

    return (
        <div className={"todo"}>
            <div className={'todo__input'}>
                <button>+</button>
                <input type={"text"} placeholder={"add new task"}/>
            </div>
            <TodoItem/>
        </div>
    );
};

