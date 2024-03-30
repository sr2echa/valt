"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Nav from './navf'; // Adjust the import path based on your folder structure
import styles from './files.module.css'; // Assuming this also contains your main container styles
import PasswordBox from './passwordbox'; // Import the new component

const Home = () => {
  // Adjusted state to hold both identifiers and their passwords
  const [passwordData, setPasswordData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPasswords = () => {
      fetch('/api/getPasswords?hash=' + localStorage.getItem('hash'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
        }
      })
        .then((response) => response.json())
        .then((data) => {
          const fetchedPasswordData = Object.entries(data).map(([identifier, password]) => ({
            identifier,
            password,
          }));
          setPasswordData(fetchedPasswordData);
        });
    };
  
    fetchPasswords();
    const intervalId = setInterval(fetchPasswords, 3000);
  
    return () => clearInterval(intervalId);
  }, []);
  const filteredPasswords = passwordData.filter(({ identifier }) =>
  identifier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <div className={styles.body}>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.padding}></div>

      <main className={styles.mainBackground}>
        {/* Render PasswordBox components with both identifier and password */}
        {filteredPasswords.length > 0 ? (
    // Render PasswordBox components with filtered passwords
    filteredPasswords.map(({ identifier, password }, index) => (
      <PasswordBox key={index} identifier={identifier} password={password} />
    ))
  ) : (
    // Render message when no passwords match the search query
    <div className={styles.noResults}>
      <img src="https://i.imgur.com/tT9WnxW.png" width={150}/>
      No results found
      </div>
  )}
      </main>
    </div>
  );
};

export default Home;
