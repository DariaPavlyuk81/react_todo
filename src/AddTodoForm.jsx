import React,{ useState} from 'react';

const AddTodoForm = ({addTodo}) => {
    const [todoTitle,setTodoTitle] = useState('');
    const handleChange = (event) => {
        setTodoTitle(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(todoTitle.trim()){
            addTodo(todoTitle);
            setTodoTitle('');//clear the input after setting
        
    }
    };

    return (
        <form onSubmit = {handleSubmit}>
            <label htmlFor="todoTitle">Title</label>
            <input 
            type = "text"
            id="todoTitle"
            value ={todoTitle}
            onChange={handleChange}
            placeholder="Enter todo title"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;