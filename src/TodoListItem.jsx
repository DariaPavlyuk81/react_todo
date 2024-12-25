import React from "react";
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
      {todo.title}
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
