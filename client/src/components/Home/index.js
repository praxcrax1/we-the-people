import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Navbar from "../Navbar";
import ProjectCardGroup from "../Project/ProjectCardGroup";

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

    return (
        <div className={styles.parentContainer}>
            <Navbar />
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
                    <div className={styles.cardContainer}>
                        <span>Recommended for you:</span>
                        <ProjectCardGroup 
                            projects={projects} 
                        />
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Home;
