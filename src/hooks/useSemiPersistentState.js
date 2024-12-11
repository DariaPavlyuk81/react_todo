import {useState, useEffect} from 'react';

//custom hook
const useSemiPersistentState = () => {
    const [todoList, setTodoList ] = useState (() => {
        const savedTodoList = localStorage.getItem('savedTodoList');
        return savedTodoList ? JSON.parse (savedTodoList) : [];
    });

    useEffect (() => {
        if (todoList.length >0) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }

    },[todoList]);
    return [todoList,setTodoList];
};
export default useSemiPersistentState;