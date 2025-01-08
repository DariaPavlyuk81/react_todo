import "./App.css";
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm"; //import AddTodoForm

// VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN=patCSzKXkXc2biEtB.bc67826c4495cfe2e189018261dc2ab69155c1bb0c14525a60c8126258723b0d
// VITE_TABLE_NAME=tblnQ7ni1ciJrS3sH
// VITE_AIRTABLE_BASE_ID=appuEULCWBeoHSEEt

const App = () => {
  const [todoList,setTodoList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

const accessToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

//const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
const apiUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`;

  const fetchData = async () => {
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    //const apiUrl = `https://api.airtable.com/v0/appuEULCWBeoHSEEt/tblnQ7ni1ciJrS3sH`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      
      
      },
    };
    try{
    const response = await fetch(apiUrl, options);
    if (!response.ok){
      
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Airtable API Response Data",data);

    
    
    const todos = data.records.map((record) => ({
      title:record.fields.title,
      id:record.id,
    }));


    setTodoList(todos);
    setIsLoading(false);
  } catch (error){
    console.error ("Error fetching data:",error.message);
    setIsLoading(false);
  }
};

 

 const addTodo = async (newTodo) => {
  if (!newTodo.title) {
    alert("Please enter a title for the new todo.");
    return;
  }
  const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

 
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
},
        body: JSON.stringify({
          fields:{
            title:newTodo.title,
          },
        }),
      });
    if (!response.ok){
      
      throw new Error(`Error adding todo: ${response.statusText}`);
    }

      const data = await response.json();

      setTodoList((prevList) => [...prevList, { title: data.fields.title, id: data.id },]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  
  useEffect(()=> {
    fetchData();
  }, []);


return (
    <div>
      <h1>ToDo List</h1>
      {/* Conditional loading message */}
      {isLoading? (
        <p>Loading...</p>
      ):(
        <TodoList todoList ={todoList}/>
      )}
      <AddTodoForm onAddTodo={addTodo}/>
    
    </div>
    
   );   


      };


  
  



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
