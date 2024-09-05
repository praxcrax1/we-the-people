import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../../redux/actions/userActions";
import axios from "axios";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
import missing from "../../Images/missing.jpg";
import { toast, ToastContainer } from "react-toastify";
import PasswordChangeModal from "./PasswordChangeModal";
import { API_URL } from "../../apiConfig";

const Profile = () => {
    const userId = useSelector((state) => state.user.userId);
    const [userDetails, setUserDetails] = useState(null);
    const [showPasswordChangeModal, setShowPasswordChangeModal] =
        useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) {
            const storedUserId = localStorage.getItem("userId");
            if (storedUserId) {
                dispatch(setUserId(storedUserId));
            }
        }

        if (userId) {
            getUserDetails(userId);
        }
    }, [userId, dispatch]);

    const getUserDetails = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/api/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("x-auth-token"),
                },
            });
            setUserDetails(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${API_URL}/api/users/${userId}`,
                {
                    name: userDetails.name,
                    email: userDetails.email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": localStorage.getItem("x-auth-token"),
                    },
                }
            );
            setUserDetails(response.data);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating user details:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.profileContainer}>
                <div className={styles.profileImage}>
                    <img src={missing} alt="missing" />
                </div>
                <div className={styles.profileDetails}>
                    <h1>Profile</h1>
                    <form className={styles.profileForm}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userDetails?.name || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userDetails?.email || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.profileFormButtons}>
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPasswordChangeModal(true)
                                }>
                                Change Password
                            </button>
                        </div>
                        <div className={styles.profileFormButtons}>
                            <button type="submit" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <PasswordChangeModal
                email={userDetails?.email}
                show={showPasswordChangeModal}
                onClose={() => setShowPasswordChangeModal(false)}
            />
            <ToastContainer />
        </>
    );
};

export default Profile;
