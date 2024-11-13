import React, { useState } from 'react';

const TodoList = () => {
    const [todos] = useState([
        { id: 1, title: "Complete Homework" },
        { id: 2, title: " Study New Lesson" },
        { id: 3, title: "Do Yoga" },

    ]);
    return (
        <div>
            <h2>Todo List Component</h2>
            <p> This is where your todos will be listed!</p>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;