import React from 'react';
import styles from './styles.module.css';
import missing from '../../Images/missing.jpg';

const ProjectCard = ({ project }) => {
    const calculateDaysLeft = (expiresAt) => {
        const now = new Date();
        const expiryDate = new Date(expiresAt);
        const differenceInTime = expiryDate - now;
        return Math.ceil(differenceInTime / (1000 * 3600 * 24));
    };

    return (
        <div className={styles.projectCard}>
            <img
                src={`https://picsum.photos/seed/${project._id}/300/200`}
                alt={project.title}
                className={styles.projectImage}
            />
            <div className={styles.cardContent}>
                <img
                    src={missing}
                    alt="Profile Icon"
                    className={styles.profileIcon}
                />
                <div className={styles.projectDetailsContainer}>
                    <span>{project.title}</span>
                    <div className={styles.fundingStatus}>
                        <span>
                            {Math.floor((project.amountRaised / project.goal) * 100)}% funded •{' '}
                            {calculateDaysLeft(project.expiresAt)} days left
                        </span>
                        <br />
                        <span className={styles.projectDescription}>{project.description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
