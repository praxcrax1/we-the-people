import React, { useState } from 'react';
import styles from './styles.module.css';

const BackProjectModal = ({ show, onClose, onSubmit }) => {
    const [amount, setAmount] = useState('');

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(amount);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Back this Project</h2>
                <form onSubmit={handleSubmit}>
                    <span>Enter Amount</span>
                    <label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            required
                        />
                    </label>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BackProjectModal;
