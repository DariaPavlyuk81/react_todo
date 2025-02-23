import React from "react";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";

// const TodoListItem = ({ todo, onRemoveTodo }) => {
//    return (
//         <li >
//             {todo.title} - {todo.task_time && `Time: ${todo.task_time}`}
//             <button
//             type = "button"
//             onClick={() =>{
//               console.log(todo.id);
//              onRemoveTodo(todo.id);
//             }}
//             >
//                 Remove
//                 </button>
//         </li>
//     );
// };

const TodoListItem = ({ todo, onRemoveTodo,onToggleComplete }) => {
  return (
    <li className={styles.ListItem}>
      <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggleComplete(todo.id)}
      />
      {todo.title} 
      {todo.completed && <span> </span>}
      <button
        className={styles.removeButton}
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
          >
        {/* <i className="fas fa-trash"></i>Remove */}
        &#x1F5D1;
      </button>
    </li>
  );
};
 
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
