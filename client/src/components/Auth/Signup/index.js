import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId, setUserDetails } from '../../../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length <= 6) {
      toast.error('Password must be greater than 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      localStorage.setItem('x-auth-token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      dispatch(setUserId(response.data.id));
      dispatch(setUserDetails(response.data.user));
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Signup failed:', error?.response?.data?.msg);
      toast.error(`${error?.response?.data?.msg}` || 'Something went wrong', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.logoContainer}><h1>WeThePeople.</h1></div>
      <div className={styles.authContainer}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <span>Signup</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? <div className={styles.loader}></div> : 'Signup'}
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
