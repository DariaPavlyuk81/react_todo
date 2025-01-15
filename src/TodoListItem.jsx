import React from 'react';
// const TodoListItem = (props) => {
//     const {todo} = props;
//     return (
//         <li>
//             {todo.title}
//         </li>
//     );
// };


const TodoListItem = ({ todo, onRemoveTodo }) => {
    return (
        <li>
            {todo.title} - {todo.task_time && `Time: ${todo.task_time}`}
            <button
            type = "button"
            onClick={() =>{
              console.log(todo.id);
             onRemoveTodo(todo.id);
            }}
            >
                Remove
                </button>
        </li>
    );
};

export default TodoListItem;