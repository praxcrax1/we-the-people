import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import missing from '../../Images/missing.jpg';
import axios from 'axios';
import ProfileBox from './ProfileBox';

const Navbar = ({ hideSearchAndStart = false, id}) => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const profileBoxRef = useRef(null);
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        const handleScroll = () => {
            if (showProfile) {
                setShowProfile(false);
            }
        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [showProfile]);

    useEffect(() => {
        getUserDetails();
    },[])

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('x-auth-token')
                }
            });
            console.log(response.data);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
  
    return (
        <div className={styles.navbar}>
            <h1>WeThePeople.</h1>
            {!hideSearchAndStart && (
                <>
                    <input type="text" placeholder="Search" />
                    <button onClick={() => navigate('/create-project')}>Start a Project</button>
                </>
            )}
            <div className={styles.profileContainer} onClick={() => setShowProfile(!showProfile)}>
                <img src={missing} alt="Profile" />
            </div>
            {showProfile && <ProfileBox ref={profileBoxRef} userDetails={userDetails} />}
        </div>
    );
};

export default Navbar;