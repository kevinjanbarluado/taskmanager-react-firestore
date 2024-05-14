import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import moment from 'moment';

const Task = ({ task }) => {

    const [isDone, toggleDone] = useState(task.isDone)
    const [isDeleted, setDeleted] = useState(false)

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (!confirmed) {
            return; // Exit the function if the user cancels
        }

        try {
            const { data } = await axiosInstance.delete(`/api/tasks/${id}`);
            if (data.success) {
                setDeleted(true);
            } else {
                alert('Error. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCheckboxChange = async (id, isDone) => {
        toggleDone((prev) => !prev);
        try {
            const { data } = await axiosInstance.put(`/api/tasks/${id}`, { isDone });
            if (data.success) {
                return
            } else {
                alert('Error. Please try again.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className={`shadow-sm col-lg-5 col-md-5 col-sm-10 col-sx-10 mx-auto bg-white card mb-2 ${isDeleted ? 'd-none' : ''}`}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className={`card-title ${isDone ? 'text-decoration-line-through' : ''}`}>{task.title}</h5>
                    <button onClick={() => handleDelete(task.id)} className='btn btn-danger btn-sm rounded-pill'>🗑️
                    </button>
                </div>

                <p className="card-text">{task.description}</p>
                <p className="card-text">
                    <small className="text-muted">
                        {moment(task.createdAt).fromNow()}
                    </small>
                </p>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={`task-${task.id}`}
                        checked={isDone}
                        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor={`task-${task.id}`}>
                        Done
                    </label>
                </div>

            </div>
        </div>
    );
};

export default Task;
