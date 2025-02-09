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

  const accessToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

  const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  // const apiUrl = `https://api.airtable.com/v0/${
  //   import.meta.env.VITE_AIRTABLE_BASE_ID
  // }/${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`;

  const fetchData = async () => {
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
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

      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
        task_time: record.fields.task_time || "",
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsLoading(false);
    }
  };

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
        { title: data.fields.title, id: data.id },
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define the Route for the root path*/}
        <Route
          path="/"
          element={
            <div key={todoList.length}>
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
              <h1>New Todo List</h1>

              <p> Here you can add a new task and the time for your task:</p>
              <AddTodoForm onAddTodo={addTodo}/>
              {/* <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTodo();
                }}
              > */}
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
              {/* </form> */}
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
