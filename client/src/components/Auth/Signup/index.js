import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

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
      await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      history('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error(error?.response?.data?.msg || 'Something went wrong', {
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
