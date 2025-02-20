import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";


const TodoList = ({ todoList, onRemoveTodo,onToggleComplete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todoList.length / todosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage (pageNumber);
  };
  return (
    <div>
      <h2> Daria's ToDo List </h2>

      {todoList.length === 0 ? (
        <p> No ToDos Yet! Add some!</p>
      ) : (
        <ul>
          {currentTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </ul>
      )}

      <div className="pagination">
        <button
        onClick = {() => handlePageChange(currentPage -1)}
        disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages}</span>
        <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
 
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(

  PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })
  ).isRequired,
onRemoveTodo: PropTypes.func.isRequired,
};
export default TodoList;
