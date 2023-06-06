import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('https://reqres.in/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (task) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://reqres.in/api/tasks',
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newTask = response.data;

      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div>
      <h1>Task Dashboard</h1>

      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>

      <h2>Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <input type="text" placeholder="Task Title" />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskDashboard;
