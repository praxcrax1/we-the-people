import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import Navbar from "../../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../apiConfig";

const CreateProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing) {
            fetchProjectDetails();
        }
    }, [id]);

    const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/projects/${id}`, {
                headers: {
                    "x-auth-token": localStorage.getItem("x-auth-token"),
                },
            });
            const { title, description, goal } = response.data;
            setTitle(title);
            setDescription(description);
            setGoal(goal.toString());
        } catch (error) {
            toast.error("Failed to fetch project details");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!title || !description || !goal) {
            toast.error("Please fill in all fields");
            return;
        }

        if (isNaN(goal) || goal <= 0) {
            toast.error("Goal must be a positive number");
            return;
        }

        try {
            setIsLoading(true);
            const url = isEditing
                ? `${API_URL}/api/projects/${id}/updates`
                : `${API_URL}/api/projects/create`;
            const method = isEditing ? axios.put : axios.post;
            const response = await method(
                url,
                {
                    title,
                    description,
                    goal: parseFloat(goal),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": localStorage.getItem("x-auth-token"),
                    },
                }
            );

            if (response.data) {
                const successMessage = isEditing
                    ? "Project updated successfully!"
                    : "Project created successfully!";
                toast.success(successMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    if (isEditing) {
                        navigate(`/project/${id}`);
                    } else {
                        navigate("/dashboard");
                    }
                }, 1000);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.msg ||
                    `An error occurred while ${
                        isEditing ? "updating" : "creating"
                    } the project`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar hideSearchAndStart={true} />
            <div className={styles.createProject}>
                <h1>{isEditing ? "Edit Project" : "Create a New Project"}</h1>
                <span>
                    {isEditing
                        ? "Edit your project details."
                        : "Create a new project to start fundraising for your cause."}
                </span>
                <form
                    className={styles.createProjectForm}
                    onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Project Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Project Goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />
                    <button type="submit">
                        {isLoading ? (
                            <div className={styles.loader}></div>
                        ) : isEditing ? (
                            "Edit Project"
                        ) : (
                            "Create Project"
                        )}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default CreateProject;
