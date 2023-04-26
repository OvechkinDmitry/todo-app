import React from 'react';
import './todo-item.css'

export const TodoItem = () => {
    return (
        <div className={"todo-item"}>
            <div className={"todo-item__body"}>
                <div className={"todo-item__checkbox"}>
                    <input type={'checkbox'}></input>
                </div>
                <p className={"todo-item__info"}>Read a book</p>
                <div>✗</div>
            </div>
            <div className={'todo-item__date'}>27.04.2003</div>
        </div>
    );
};

