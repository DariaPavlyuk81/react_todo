import React, { useState } from 'react';
import TodoListItem from './TodoListItem';

// const TodoList = ({ todos }) => {
//     const [todos] = useState([
//         { id: 1, title: "Complete Homework" },
//         { id: 2, title: " Study New Lesson" },
//         { id: 3, title: "Do Yoga" },

//     ]);


const TodoList = ({ todos }) => {


    return (
        <div>
            <h2> My ToDo List </h2>

            {todos.length === 0 ? (
                <p> No ToDos Yet! Add some!</p>
            ) : (
                <ul>

                    {todos.map((todo) => (
                        <TodoListItem key={todo.id} todo={todo} />
                    ))}

                </ul>
            )}
        </div>
    );
};

export default TodoList;