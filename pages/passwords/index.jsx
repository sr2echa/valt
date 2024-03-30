"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Nav from './navf'; // Adjust the import path based on your folder structure
import styles from './files.module.css'; // Assuming this also contains your main container styles
import PasswordBox from './passwordbox'; // Import the new component

const Home = () => {
  // Adjusted state to hold both identifiers and their passwords
  const [passwordData, setPasswordData] = useState([]);

  useEffect(() => {
    fetch('/assets/content.json')
      .then((response) => response.json())
      .then((data) => {
        // Fetching both identifiers and passwords
        const walletData = data['wallet_001'].passwords;
        const fetchedPasswordData = Object.entries(walletData).map(([identifier, password]) => ({
          identifier,
          password,
        }));
        setPasswordData(fetchedPasswordData);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Nav />
      <div className={styles.padding}></div>

      <main className={styles.mainBackground}>
        {/* Render PasswordBox components with both identifier and password */}
        {passwordData.map(({ identifier, password }, index) => (
          <PasswordBox key={index} identifier={identifier} password={password} />
        ))}
      </main>
    </div>
  );
};

export default Home;
