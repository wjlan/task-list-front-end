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
  const initialCopy = TASKS.map(task => {
    return {...task};
  });

  const [taskData, setTaskData] = useState(initialCopy);

  const updateIsComplete = (taskId) => {
    console.log("calling updateIsComplete");
  }


 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList tasks={initialCopy} updateIsComplete={updateIsComplete} />}
        </div>
      </main>
    </div>
  );
};

export default App;
