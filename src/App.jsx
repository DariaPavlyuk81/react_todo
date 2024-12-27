import "./App.css";
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm"; //import AddTodoForm



// //load from local Storage
// useEffect (() => {
//   const savedTodoList = localStorage.getItem ('savedTodoList');
//   if(savedTodoList){
//     setTodoList(JSON.parse(savedTodoList));
//   }
// },[]);

//  const App = ()=> {
//   const [todoList,setTodoList] = useState (() => {
//          const savedTodoList = localStorage.getItem('savedTodoList');
//     return savedTodoList ? JSON.parse(savedTodoList) : [];
//   });

//   useEffect (() => {
//     if (todoList.length >0) {
//         localStorage.setItem('savedTodoList', JSON.stringify(todoList));
//     }
  
//   },[todoList]);


const App = () => {
  const [todoList,setTodoList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=> {
    const fetchTodos = new Promise((resolve, reject) => {
      setTimeout(()=> {
        resolve({
          data:{
            todoList:[
              {id: 1, title: "Complete Homework"},
              {id: 2, title: "Study New Lesson"},
              {id: 3, title: "Do Yoga"},
            ],
          },
        });
      }, 2000)
    });
    fetchTodos.then((result)=> {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  },[]);

useEffect (() => {
  if (!isLoading) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }
}, [todoList, isLoading]);


  //addToDo fun ction
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

return (
    <>
      <h1>ToDo List</h1>
      {/* Conditional loading message */}
      {isLoading? (
        <p>Loading...</p>
      ):(
        <>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
      )}
      </>
  );
};



  // //save todo list to localStorage
  // useEffect (() => {
  //   if (todoList.length >0){
  //     localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  //   }
  // },[todoList]);

  // //addToDo function
  // const addTodo = (newTodo) => {
  //   setTodoList([...todoList,newTodo]);

  // };
  // const handleAddToDo =(newTitle) => {
  //   const newTodo = { id: Date.now(), title:newTitle};
  //   setTodoList([...todoList,newTodo]);
  // };

  
// const [todos, setTodos] = useState([
//   { id: 1, title: "Complete Homework" },
//   { id: 2, title: " Study New Lesson" },
//   { id: 3, title: "Do Yoga" },
// ]);

// const addTodo = (newTitle) => {
//   const newTodo = {
//     id: todos.length + 1,
//     title: newTitle,
//   };
//   setTodos([...todos, newTodo]);
// };
// //function App() {
//   // const [count, setCount] = useState(0)

// const App = () => {
//   const [newTodo,setNewTodo] = useState('');

//   return (
//     <div>
//       <h1>ToDo List</h1>
//       <AddTodoForm onAddTodo={addTodo} />
//       <TodoList todos={todos} />

//     </div>
//   );
// };

//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
