import React, {FC} from 'react';
import './todo-item.css'

type TTodoItem = {
    value: string
    done: boolean
    deleteItem: (id: string) => void
    toggleTodo: (id: string) => void
    id: any
    time: string
}


export const TodoItem:FC<TTodoItem> = ({value, done, deleteItem, toggleTodo, id, time}) => {
    return (
        <div className={"todo-item"}>
            <div className={"todo-item__body"}>
                <div className={"todo-item__checkbox"}>
                    <input type={'checkbox'} onChange={() => toggleTodo(id)} checked={done}></input>
                </div>
                <p className={"todo-item__info"}>{value}</p>
                <div style={{cursor: "pointer"}} onClick={() => deleteItem(id)}>✗</div>
            </div>
            <div className={'todo-item__date'}>{time}</div>
        </div>
    );
};

