// About.jsx
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About This App</h1>
      <p>
        This To-Do List app helps you keep track of your tasks with time
        management.
      </p>
      <p>
        It connects to Airtable to store your tasks and keep your busy schedule organized, so you
        can access your to-dos from any device.
      </p>
      <p>Features:</p>
      <ul>
        <li>Create new tasks</li>
        <li>Prioritize Tasks</li>
        <li>Delete tasks when done</li>
      </ul>
      <p className="info">Built with React and Airtable API!</p>
    </div>
  );
};

export default About;
