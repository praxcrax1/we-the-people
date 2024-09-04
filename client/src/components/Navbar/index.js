import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import missing from '../../Images/missing.jpg';

const Navbar = ({ hideSearchAndStart = false }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.navbar}>
            <h1>WeThePeople.</h1>
            {!hideSearchAndStart && (
                <>
                    <input type="text" placeholder="Search" />
                    <button onClick={() => navigate('/create-project')}>Start a Project</button>
                </>
            )}
            <div className={styles.profileContainer}>
                <img src={missing} alt="Profile" />
            </div>
        </div>
    );
};

export default Navbar;