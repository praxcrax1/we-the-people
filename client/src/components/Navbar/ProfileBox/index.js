import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { logoutUser } from "../../../redux/actions/userActions";

const ProfileBox = ({ userDetails, position }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    const profileBoxStyle = {
        top: `${position.top}px`,
        right: `${position.right}px`,
        left: `${position.left}px`,
        bottom: `${position.bottom}px`,
    };

    return (
        <div className={styles.profileBox} style={profileBoxStyle}>
            <div className={styles.column}>
                <h3>Account</h3>
                <ul>
                    <li onClick={() => navigate("/profile")}>Profile</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className={styles.column}>
                <h3>Projects</h3>
                <ul>
                    {userDetails?.createdProjects.map((project, index) => (
                        <li
                            key={index}
                            onClick={() => navigate(`/project/${project._id}`)}>
                            {project.title}
                        </li>
                    ))}
                    <li onClick={() => navigate("/create-project")}>
                        Create a Project +
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileBox;
