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

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <li className={styles.ListItem}>
      {todo.title} -{todo.task_time && `Time: ${todo.task_time}`}
      <button
        className={styles.removeButton}
        type="button"
        onClick={() => {
          console.log("Removing todo with id:", todo.id);
          onRemoveTodo(todo.id);
        }}
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
    text: PropTypes.string.isRequired,
  
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoListItem;
