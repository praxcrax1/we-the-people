import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import missing from '../../Images/missing.jpg';
import axios from 'axios';
import ProfileBox from './ProfileBox';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from '../../redux/actions/userActions';
import debounce from 'lodash/debounce';

const Navbar = ({ hideSearchAndStart = false}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfile, setShowProfile] = useState(false);
    const profileBoxRef = useRef(null);
    const [userDetails, setUserDetails] = useState(null);
    const id = useSelector(state => state.user.userId);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        if (!id) {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                dispatch(setUserId(storedUserId));
            }
        }
        getUserDetails();
    }, [id, dispatch]);

    const getUserDetails = async () => {
        const userId = id || localStorage.getItem('userId');
        if (!userId) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('x-auth-token')
                }
            });
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleSearch = async (term) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/projects/list?title=${term}`);
            setSearchResults(response.data);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error searching projects:', error);
        }
    };

    const debouncedSearch = useCallback(
        debounce((term) => {
            if (term) {
                handleSearch(term);
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
        setShowDropdown(false);
    };
  
    return (
        <>
        <div className={styles.navbar}>
            <h1 onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>WeThePeople.</h1>
            {!hideSearchAndStart && (
                <>
                    <div className={styles.searchContainer}>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        />
                        {showDropdown && searchResults.length > 0 && (
                            <div className={styles.searchDropdown}>
                                {searchResults.map((project) => (
                                    <div 
                                        key={project._id} 
                                        className={styles.searchItem}
                                        onClick={() => handleProjectClick(project._id)}
                                    >
                                        <span>{project.title}</span>
                                        <span>{project.creator.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={() => navigate('/create-project')}>Start a Project</button>
                </>
            )}
            <div className={styles.profileContainer} onClick={() => setShowProfile(!showProfile)}>
                <img src={missing} alt="Profile" />
            </div>
        </div>
        {showProfile && <div className={styles.profileBoxContainer}><ProfileBox ref={profileBoxRef} userDetails={userDetails}/></div    >}
        </>
    );
};

export default Navbar;