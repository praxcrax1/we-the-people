import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { logoutUser } from '../../../redux/actions/userActions';

const ProfileBox = ({ userDetails }) => {
    const navigate = useNavigate();
        const id = useSelector(state => state.user.userId);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };


    return (
        <div className={styles.profileBox}>
            <div className={styles.column}>
                <h3>Account</h3>
                <ul>
                    <li onClick={() => navigate('/profile')}>Profile</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className={styles.column}>
                <h3>Projects</h3>
                <ul>
                    {userDetails?.createdProjects.map((project, index) => (
                        <li key={index} onClick={() => navigate(`/project/${project._id}`)}>{project.title}</li>
                    ))}
                    <li onClick={() => navigate('/create-project')}>Create a Project +</li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileBox;
