import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import Navbar from '../../Navbar';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../apiConfig';
const CreateProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!title || !description || !goal) {
            toast.error('Please fill in all fields');
            return;
        }

        if (isNaN(goal) || goal <= 0) {
            toast.error('Goal must be a positive number');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}/api/projects/create`, {
                title,
                description,
                goal: parseFloat(goal)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('x-auth-token')
                }
            });

            if (response.data) {
                toast.success('Project created successfully!');
                setTitle('');
                setDescription('');
                setGoal('');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || 'An error occurred while creating the project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <>
        <Navbar hideSearchAndStart={true} />
        <div className={styles.createProject}>
            <h1>Create a New Project</h1>
            <span>Create a new project to start fundraising for your cause.</span>
            <form className={styles.createProjectForm} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Project Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Project Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Project Goal" 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                />
                <button type="submit">{isLoading ? <div className={styles.loader}></div> : "Create Project"}</button>
            </form>
        </div>
        <ToastContainer />
    </>
    );
};

export default CreateProject;
