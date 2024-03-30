// pages/logout.jsx

import Link from 'next/link';
import styles from './logout.module.css'; // Import CSS module for styling

const LogoutPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.message}>You have successfully logged out of Valt</h1>
      <Link href="/" className={styles.button}>Login
      </Link>
    </div>
  );
};

export default LogoutPage;
