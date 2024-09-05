import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import missing from "../../Images/missing.jpg";
import axios from "axios";
import ProfileBox from "./ProfileBox";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../../redux/actions/userActions";
import debounce from "lodash/debounce";
import { API_URL } from "../../apiConfig";

const Navbar = ({ hideSearchAndStart = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfile, setShowProfile] = useState(false);
    const profileBoxRef = useRef(null);
    const [userDetails, setUserDetails] = useState(null);
    const id = useSelector((state) => state.user.userId);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [profilePosition, setProfilePosition] = useState({
        top: 0,
        right: 0,
    });


    const getUserDetails = useCallback(async () => {
        const userId = id || localStorage.getItem("userId");
        if (!userId) return;

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
    }, [id]);

    useEffect(() => {
        if (!id) {
            const storedUserId = localStorage.getItem("userId");
            if (storedUserId) {
                dispatch(setUserId(storedUserId));
            }
        }
        getUserDetails();
    }, [id, dispatch, getUserDetails]);

    const handleSearch = useCallback(
        async (term) => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/projects/list?title=${term}`
                );
                setSearchResults(response.data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Error searching projects:", error);
            }
        },
        []
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((term) => {
            if (term) {
                handleSearch(term);
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300),
        [handleSearch]
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => {
            debouncedSearch.cancel(); // Cleanup debounce on unmount
        };
    }, [searchTerm, debouncedSearch]);

    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
        setShowDropdown(false);
    };

    const handleProfileClick = (event) => {
        if (hideSearchAndStart) {
            setProfilePosition({
                top: 10,
                right: 10,
            });
        } else {
            setProfilePosition({
                top: 10,
                left: 320,
            });
        }
        setShowProfile(!showProfile);
    };

    return (
        <>
            <div
                className={`${styles.navbar} ${
                    hideSearchAndStart ? styles.navbarCompact : ""
                }`}>
                <h1
                    onClick={() => navigate("/dashboard")}
                    style={{ cursor: "pointer" }}>
                    WeThePeople.
                </h1>
                {!hideSearchAndStart && (
                    <>
                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() =>
                                    setTimeout(
                                        () => setShowDropdown(false),
                                        200
                                    )
                                }
                            />
                            {showDropdown && searchResults.length > 0 && (
                                <div className={styles.searchDropdown}>
                                    {searchResults.map((project) => (
                                        <div
                                            key={project._id}
                                            className={styles.searchItem}
                                            onClick={() =>
                                                handleProjectClick(project._id)
                                            }>
                                            <span>{project.title}</span>
                                            <span>{project.creator.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => navigate("/create-project")}>
                            Start a Project
                        </button>
                    </>
                )}
                <div
                    className={styles.profileContainer}
                    onClick={handleProfileClick}>
                    <img src={missing} alt="Profile" />
                </div>
            </div>
            {showProfile && (
                <div className={styles.profileBoxContainer}>
                    <ProfileBox
                        ref={profileBoxRef}
                        userDetails={userDetails}
                        position={profilePosition}
                    />
                </div>
            )}
        </>
    );
};

export default Navbar;
