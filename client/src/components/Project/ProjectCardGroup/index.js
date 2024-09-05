import React from "react";
import ProjectCard from "../ProjectCard";
import styles from "./styles.module.css"; // Assuming you have CSS modules

const ProjectCardGroup = ({ projects }) => {
    return (
        <div className={styles.cardContainer}>
            {projects.length > 0 ? (
                [...projects]
                    .reverse()
                    .map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))
            ) : (
                <p>No projects available.</p>
            )}
        </div>
    );
};

export default ProjectCardGroup;
