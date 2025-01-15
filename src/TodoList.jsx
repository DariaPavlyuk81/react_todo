import React, { useState } from "react";
import TodoListItem from "./TodoListItem";

// const TodoList = ({ todoList}) => {
//     const [todos] = useState([
//         { id: 1, title: "Complete Homework" },
//         { id: 2, title: " Study New Lesson" },
//         { id: 3, title: "Do Yoga" },

//     ]);

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <div>
      <h2> My ToDo List </h2>

      {todoList.length === 0 ? (
        <p> No ToDos Yet! Add some!</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
      

export default TodoList;
