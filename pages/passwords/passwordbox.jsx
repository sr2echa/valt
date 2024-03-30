import React, { useState } from 'react';
import { FaUnlock, FaCopy } from 'react-icons/fa'; // Assuming these are correctly imported
import styles from './passwordbox.module.css';

const PasswordBox = ({ identifier, password }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
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
        {copied ? 'Copied!' : <FaCopy />}
      </button>
    </div>
  );
};

export default PasswordBox;
