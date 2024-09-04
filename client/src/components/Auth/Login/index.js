
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId, setUserDetails } from '../../../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('x-auth-token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      dispatch(setUserId(response.data.id));
      dispatch(setUserDetails(response.data.user));
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Login failed:', error?.response?.data?.msg);
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
          <span>Log In</span>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? <div className={styles.loader}></div> : 'Login'}
          </button>
        </form>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
