import "./App.css";
import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm"; //import AddTodoForm
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Contact from "./Contact";
import About from "./About";

// VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN=patCSzKXkXc2biEtB.bc67826c4495cfe2e189018261dc2ab69155c1bb0c14525a60c8126258723b0d
// VITE_TABLE_NAME=tblnQ7ni1ciJrS3sH
// VITE_AIRTABLE_BASE_ID=appuEULCWBeoHSEEt

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [isAscending,setIsAscending] = useState(true);

  const accessToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

  const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  // const apiUrl = `https://api.airtable.com/v0/${
  //   import.meta.env.VITE_AIRTABLE_BASE_ID
  // }/${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`;

  const fetchData = async () => {
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}?view=Grid%20view`;
    //const apiUrl = `https://api.airtable.com/v0/appuEULCWBeoHSEEt/tblnQ7ni1ciJrS3sH`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("Airtable API Response Data", data);

      //ascending order
      const sortedData =data.records.sort((a,b) => {
        const titleA = a.fields.title ? a.fields.title.toLowerCase() : '';
        const titleB = b.fields.title ? b.fields.title.toLowerCase() : '';

        if (isAscending){
          return titleA < titleB ? -1 : titleA >titleB ? 1:0;
        }else{
          return titleA<titleB ?1: titleA > titleB ? -1 :0;
        }

      });


      const todos = sortedData.map((record) => ({
        title: record.fields.title,
        id: record.id,
        task_time: record.fields.task_time || "",
      }));
      // const todos = data.records.map((record) => ({
      //   title: record.fields.title,
      //   id: record.id,
      //   task_time: record.fields.task_time || "",
      // }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsLoading(false);
    }
  };

  const toggleSortOrder = () => {
    setIsAscending(prevState => {
      const newState = !prevState;
      return newState;
    });
  };

  useEffect(()=>{
    fetchData();
  },[isAscending]);

  // return(
  //   <div>
  //     <button onClick={toggleSortOrder}>
  //       Sort {isAscending ? "Descending" : "Ascending"}
  //     </button>
  //     <h1>ToDo List</h1>
  //     {isLoading ? <p>Loading...</p>:<TodoList todoList={todoList}/>}
  //     <AddTodoForm onAddTodo={addTodo}/>
  //   </div>
  // )
  const removeTodo = async (id) => {
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}/${id}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    });

    if (response.ok) {
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    } else {
      console.error("Failed to delete todo", response);
    }
  };
  // try {
  //   const response = await fetch(apiUrl, options);
  //     if (!response.ok) {
  //       throw new Error(`Error deleting todo: ${response.statusText}`);
  //     }
  //      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
  //     // setTodoList((prevList) => {
  //     //   const updatedList = prevList.filter((todo) => todo.id !==id);
  //     //   console.log ("Updated Todo List:", updatedList);
  //     //   return updatedList;
  //     // });
  //   } catch (error) {
  //     console.error("Error deleting todo:", error);
  //   }
  // };

  const addTodo = async (newTodo) => {
    if (!newTodo.title) {
      alert("Please enter a title for the new todo.");
      return;
    }
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            title: newTodo.title,
            task_time:newTodo.task_time,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`Error adding todo: ${response.statusText}`);
      }

      const data = await response.json();
      // TodoList todoList={todoList} onRemoveTodo={removeTodo}
      //setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));

      setTodoList((prevList) => [
        ...prevList,
        { title: data.fields.title, id: data.id,task_time: data.fields.task_time},
      ]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTaskTime(event.target.value);
  };

  const handleTimeSubmit = (event) => {
    event.preventDefault();
    alert(`Time set for this task:${taskTime}`);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define the Route for the root path*/}
        <Route
          path="/"
          element={
            <div>
              <button onClick={toggleSortOrder}
              style={{
                position:'absolute',
                top: '15px',
                left: '10px',
                zIndex:9999,
                backgroundColor: 'lightblue',
                padding: '10px',
                }}
              >
                Sort {isAscending ? "A-Z" : "Z-A"}
                </button>
              <h1>ToDo List</h1>
              {/* Conditional loading message */}
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
              <AddTodoForm onAddTodo={addTodo} />
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<div><h1>Contact</h1></div>}/> */}
        <Route path="/contact" element={<Contact />} />
        //{/*New Route for /new path with form to add Todo amd Time*/}
        <Route
          path="/new"
          element={
            <div>
              <h1>New Todo</h1>
<form onSubmit={(e) => {
  e.preventDefault();
  addTodo({title:taskTitle,task_time: taskTime});
}}
>
              {/* <p> Here you can add a new task and the time for your task:</p>
              <AddTodoForm onAddTodo={addTodo}/>
              {/* <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTodo();
                }} */}
            
                <label>
                  Todo Title:
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={handleTitleChange}
                    placeholder="Enter task title"
                    required
                  />
                </label>
                <br />
                <label>
                  Time (in hours and minutes):
                  <input
                    type="time"
                    value={taskTime}
                    onChange={handleTimeChange}
                    required
                  />
                </label>
                <br />
                <button type="submit">Add Todo</button>
              </form> 
            </div>
          }
        />
        
      
      </Routes>
    </Router>
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
