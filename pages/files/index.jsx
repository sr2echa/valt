// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Nav from './navf'; // Adjust the import path based on your folder structure
import styles from './files.module.css';
import FileBox from './filebox'; // Adjust path as necessary

const Home = () => {
  const [files, setFiles] = useState([]);

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
        {files.map((file, index) => (
          <FileBox key={index} fileName={file.fileName} />
        ))}
      </main>
    </div>
  );
};

export default Home;
