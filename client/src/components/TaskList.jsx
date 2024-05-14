import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; // Import the custom Axios instance
import Task from './Task';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap'; // Assuming reactstrap is used for Bootstrap components

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/api/tasks');
                const sortedTasks = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                setTasks(sortedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Failed to load tasks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 poetsen-one-regular">Task List</h1>
            <div className="d-flex justify-content-center mb-3">
                <Link to="/add-task" className="btn btn-primary">Add Task</Link>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center">
                    <p>No tasks available. Click "Add Task" to create a new task.</p>
                </div>
            ) : (
                <div className="list-group">
                    {tasks.map(task => (
                        <Task key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
