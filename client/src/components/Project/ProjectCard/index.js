import React from "react";
import styles from "./styles.module.css";
import missing from "../../../Images/missing.jpg";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    const truncateDescription = (description, maxLength = 100) => {
        if (description.length <= maxLength) return description;
        return description.slice(0, maxLength) + "...";
    };

    return (
        <div
            className={styles.projectCard}
            onClick={() => {
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
                    <span className={styles.projectTitle}>{project.title}</span>
                    <span className={styles.creator}>
                        by {project.creator.name}
                    </span>
                    <div className={styles.fundingStatus}>
                        <span>
                            {Math.floor(
                                (project.amountRaised / project.goal) * 100
                            )}
                            % funded
                        </span>
                    </div>
                    <div className={styles.projectDescription}>
                        {truncateDescription(project.description)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
