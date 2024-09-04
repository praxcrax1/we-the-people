import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';
import Navbar from '../../Navbar';
import BackProjectModal from './BackProjectModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Back = ({}) => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject();
    }, [id]);

    const handleBackProject = async (amount) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/projects/${id}/contribute`,
                { amount },
                { headers: { 'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('x-auth-token') } }
            );
            setProject(response.data);
            setShowModal(false);
            toast.success('Contribution successful!');
        } catch (error) {
            console.error('Error backing project:', error);
            toast.error('Failed to contribute. Please try again.');
        }
    };

    const progressPercentage = project ? (project.amountRaised / project.goal) * 100 : 0;

    return (
        <>
            <Navbar hideSearchAndStart={true}/>
            <div className={styles.back}>
                {project ? (
                    <> 
                        <div className={styles.heading}>
                            <span>{project.title}</span>
                            <p>{project.description}</p>
                        </div>
                        <div className={styles.parent}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={`https://picsum.photos/seed/${id}/300/200`}
                                    alt={project.title}
                                />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.line}/>
                                <span className={styles.goal}>${project.goal}</span>
                                <span className={styles.amountRaised}>Amount Raised <br/><p>${project.amountRaised}</p></span>
                                <span className={styles.backers}>{project.backers.length}<br/><p>Backers</p></span>
                                <span className={styles.dateCreated}>Created on<br/><p>{new Date(project.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p></span>
                                <div className={styles.progressCircle}>
                                    <svg className={styles.circleSvg} viewBox="0 0 36 36">
                                        <path
                                            className={styles.circleBg}
                                            d="M18 2.0845
                                               a 15.9155 15.9155 0 0 1 0 31.831
                                               a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className={styles.circle}
                                            strokeDasharray={`${progressPercentage}, 100`}
                                            d="M18 2.0845
                                               a 15.9155 15.9155 0 0 1 0 31.831
                                               a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className={styles.progressText}>
                                        {Math.round(progressPercentage)}%
                                    </div>
                                </div>
                                <button className={styles.backButton} onClick={() => setShowModal(true)}>Back Project</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.loading}></div>
                )}
            </div>
            <BackProjectModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleBackProject}
            />
            <ToastContainer/>
        </>
    );
};

export default Back;
