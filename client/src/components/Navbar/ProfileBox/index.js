import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const ProfileBox = ({ ref, userDetails }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic here
        console.log('Logout clicked');
    };

    return (
        <div className={styles.profileBox} ref={ref}>
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
                    {userDetails.createdProjects.map((project, index) => (
                        <li key={index} onClick={() => navigate(`/project/${project._id}`)}>{project.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileBox;
