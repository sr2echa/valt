// components/PasswordBox.js
import { FaUnlock } from 'react-icons/fa6';
import React from 'react';
import { FaCopy } from 'react-icons/fa'; // Assuming FaCopy is the correct icon
import styles from './passwordbox.module.css';

const PasswordBox = ({ identifier, password }) => {
  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert('Password copied to clipboard!'); // Consider using a less intrusive notification method in production
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  return (
    <div className={styles.passwordBox}>
      <div className={styles.content}>
        <span className={styles.identifier}>{identifier}</span>
        <div className={styles.passwordRow}>
          <FaUnlock className={styles.icon} />
          <span className={styles.password}>**********</span>
        </div>
      </div>
      <button onClick={handleCopyPassword} className={styles.copyButton}>
        <FaCopy />
      </button>
    </div>
  );
};


export default PasswordBox;
