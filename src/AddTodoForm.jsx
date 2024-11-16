import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');


    const handleAddTodo = (event) => {
        event.preventDefault();



        if (todoTitle.trim()) {
            onAddTodo(todoTitle);
        }
        //clear value
        setTodoTitle('');


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
                onChange={(e) => setTodoTitle(e.target.value)}
                placeholder="Enter todo title"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodoForm;