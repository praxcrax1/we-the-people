import React from 'react';
import styles from './styles.module.css';
import missing from '../../Images/missing.jpg';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <h1>WeThePeople.</h1>
            <input type="text" placeholder="Search" />
            <button>Start a Project</button>
            <div className={styles.profileContainer}>
                <img src={missing} alt="Profile" />
            </div>
        </div>
    );
};

export default Navbar;