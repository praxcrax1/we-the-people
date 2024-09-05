import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.errorPage}>
            <div className={styles.errorContainer}>
                <h1>404</h1>
                <p>Page not found</p>
                <button
                    className={styles.errorButton}
                    onClick={() => navigate("/")}>
                    Go to home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
