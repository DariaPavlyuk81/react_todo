import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    //new state varieble todoTitle, setTodoTitle
    const [todoTitle, setTodoTitle] = useState('');

//handleTitleChange function
const handleTitleChange =(event) => {
    setTodoTitle(event.target.value);
    // const newTodoTitle = event.target.value;
    // setTodoTitle(newTodoTitle);
};

//handleAddToDo function
const handleAddTodo = (event) => {
        event.preventDefault();
if (todoTitle.trim()) {
    const newTodo = {
        id: Date.now(),
        title: todoTitle,
    };
            onAddTodo(newTodo);
        //clear value
        setTodoTitle('');

}
    };



    // const handleChange = (event) => {
    //     setTodoTitle(event.target.value);
    // };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if(todoTitle.trim()){
    //         addTodo(todoTitle);
    //         setTodoTitle('');//clear the input after setting

    // }
    // };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input
                type="text"
                id="todoTitle"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
                placeholder="Enter todo title"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodoForm;