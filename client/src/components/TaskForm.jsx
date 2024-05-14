import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    // Create the request payload with additional fields
    const payload = {
        title,
        description,
        createdAt: new Date().toISOString(),
        isDone: false
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post('/api/tasks', payload)
            .then(() => navigate('/'))
            .catch(error => console.error('Error adding task:', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 poetsen-one-regular">Add task</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">Add Task</button>
                <button type="button" onClick={() => navigate('/')} className="btn btn-outline-secondary">Back</button>
            </form>
        </div>
    );
};

export default TaskForm;
