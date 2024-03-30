// pages/index.js
import React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Nav from './navf'; // Adjust the import path based on your folder structure
import styles from './files.module.css';
import FileBox from './filebox'; // Adjust path as necessary

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulating fetching data from 'public/assets/content.json'
    fetch('/assets/content.json')
      .then((response) => response.json())
      .then((data) => {
        const walletFiles = data['wallet_001'].files;
        const fileNames = Object.keys(walletFiles).map((fileName) => ({
          fileName
        }));
        setFiles(fileNames);
      });
  }, []);

  // Function to handle search input change
  
  // Function to filter files based on search query
  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.padding}></div>
      <main className={styles.mainBackground}>
        {/* Search input field */}
        
        
        {/* Render filtered files */}
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <FileBox key={index} fileName={file.fileName} />
          ))
        ) : (
          <div className={styles.noResults}>No results found</div>
        )}
      </main>
    </div>
  );
};

export default Home;
