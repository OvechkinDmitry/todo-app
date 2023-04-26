import React from 'react';
import './todo-item.css'

export const TodoItem = () => {
    return (
        <div className={"todo-item"}>
            <div className={"todo-item__checkbox"}>
                <input type={'checkbox'}></input>
            </div>
            <p className={"todo-item__info"}>Item</p>
            <div>DELETE</div>
        </div>
    );
};

