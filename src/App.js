import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const initialCopy = TASKS.map((task) => {
    return { ...task };
  });

  const [taskData, setTaskData] = useState(initialCopy);

  const updateIsComplete = (id) => {
    const tasks = taskData.map((task) => {
      if (task.id === id) {
        const newTask = {
          ...task,
          isComplete: !task.isComplete,
        };
        return newTask;
      } else {
        return task;
      }
    });
    setTaskData(tasks);
  };

  const deleteTask = (id) => {
    const tasks = [];
    for (const task of taskData) {
      if (task.id !== id) {
        tasks.push(task);
      }
    } 
    setTaskData(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={taskData} updateIsComplete={updateIsComplete} deleteTask={deleteTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
