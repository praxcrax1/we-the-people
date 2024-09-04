import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import { API_URL } from '../../../apiConfig';

const PasswordChangeModal = ({ show, onClose, onSubmit, email }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    if (!show) return null;

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/change-password`, {
                email: email,
                oldPassword,
                newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('x-auth-token')
                }
            });
            
            if (response.data.msg === 'Password updated successfully') {
                onSubmit();
                onClose();
                toast.success('Password changed successfully!');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            if (error.response && error.response.data.msg === 'Invalid old password') {
                toast.error('Invalid old password. Please try again.');
            } else {
                toast.error('Failed to change password. Please try again.');
            }
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Change Password</h2>
                <form onSubmit={handleChangePassword}>
                    <label>
                        Old Password:
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className={styles.submitButton}>Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
