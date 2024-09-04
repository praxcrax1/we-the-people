import React from 'react';
import styles from './styles.module.css';
import missing from '../../../Images/missing.jpg';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.projectCard} onClick={() => {
            navigate(`/project/${project._id}`);
        }}>
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
                        </span>
                        <br />
                        <div className={styles.projectDescription}><span>{project.description}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
