import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import arrow from "../../Images/arrow.png";

const Landing = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleScroll = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className={styles.parentContainer}>
            <div className={styles.logoContainer}>
                <h1>WeThePeople.</h1>
                <span>Empowering Ideas, One Contribution at a Time.</span>
                <div className={styles.arrowContainer}>
                    <img src={arrow} alt="logo" onClick={handleScroll} />
                </div>
            </div>
            <div className={styles.landingContainer}>
                <span>Log In or Signup to continue.</span>
                <div className={styles.buttonContainer}>
                    <Link to="/login" className={styles.button}>
                        Login
                    </Link>
                    <Link to="/signup" className={styles.button}>
                        Signup
                    </Link>
                </div>
                <span className={styles.footer}>
                    Made with ❤️ by{" "}
                    <Link to="https://github.com/praxcrax1">Prakhar</Link>
                </span>
            </div>
        </div>
    );
};

export default Landing;
