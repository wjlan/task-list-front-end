import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const URL = 'http://localhost:5000/tasks';

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const taskDataFromAPI = response.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTaskData(taskDataFromAPI);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateIsComplete = (id, originalStatus) => {
    const URLPath = originalStatus
      ? `${URL}/${id}/mark_incomplete`
      : `${URL}/${id}/mark_complete`;

    axios
      .patch(URLPath)
      .then(() => {
        const updatedTasks = taskData.map((task) => {
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
        setTaskData(updatedTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const updatedTasks = [];
        for (const task of taskData) {
          if (task.id !== id) {
            updatedTasks.push(task);
          }
        }
        setTaskData(updatedTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            updateIsComplete={updateIsComplete}
            deleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
