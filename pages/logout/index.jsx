import Link from 'next/link';
import { useEffect } from 'react';
import styles from './logout.module.css';
import { useRouter } from 'next/router';
import { useDisconnect } from "wagmi";

const LogoutPage = () => {
  const router = useRouter();
  const { disconnect } = useDisconnect(); // This should be called at the top level of your component

  useEffect(() => {
    // Define an async function to perform your async operations
    const disconnectWalletAndLogout = async () => {
      await disconnect(); // Assuming disconnect is an async operation; adjust based on its actual implementation
      localStorage.removeItem('hash');
      localStorage.removeItem('walletId');

      // Redirect user to the home page or login page after logout operations
      router.push('/'); // Adjust the path as needed
    };

    // Call the async function
    disconnectWalletAndLogout();
  }, [disconnect, router]); // Add `disconnect` to the dependency array

  return (
    <div className={styles.container}>
      <h1 className={styles.message}>You have successfully logged out of Valt</h1>
      <Link href="/" className={styles.button}>Login</Link> {/* Corrected usage of <Link> with <a> */}
    </div>
  );
};

export default LogoutPage;
