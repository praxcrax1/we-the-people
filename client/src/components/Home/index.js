import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import missing from "../../Images/missing.jpg";

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch the list of projects from the API
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/projects/list"
                );
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout clicked");
    };

    const calculateDaysLeft = (expiresAt) => {
        const currentDate = new Date();
        const expirationDate = new Date(expiresAt);
        const timeDifference = expirationDate.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysLeft;
    };

    return (
        <div className={styles.parentContainer}>
            <div className={styles.navbar}>
                <h1>WeThePeople.</h1>
                <input type="text" placeholder="Search" />
                <button>Start a Project</button>
                <div className={styles.profileContainer}>
                    <img src={missing} alt="Profile" />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.introContainer}>
                    <span>Bring a creative idea to life</span>
                </div>
                <span>On WeThePeople:</span>
                <div className={styles.statsContainer}>
                    <div className={styles.stat}>
                        <span>1000+</span>
                        <span>Projects Funded</span>
                    </div>
                    <div className={styles.stat}>
                        <span>$20M+</span>
                        <span>Towards creative projects</span>
                    </div>
                    <div className={styles.stat}>
                        <span>10K+</span>
                        <span>Backers</span>
                    </div>
                </div>
                <div className={styles.cardContainerParent}>
                    <span>Recommended for you:</span>
                    <div className={styles.cardContainer}>
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div
                                    key={project._id}
                                    className={styles.projectCard}>
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
                                            <div
                                                className={
                                                styles.projectDetailsContainer
                                            }>
                                                <span>{project.title}</span>
                                                <div className={styles.fundingStatus}>
                                              <span>
                                                {Math.floor(
                                                    (project.amountRaised /
                                                        project.goal) *
                                                        100
                                                )}
                                                % funded •{" "}
                                                {calculateDaysLeft(project.expiresAt)} days left
                                            </span><br/>
                                            <span className={styles.projectDescription}>{project.description}</span>
                                        </div>
                                            </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No projects available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
