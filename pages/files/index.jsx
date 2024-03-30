import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Nav from './navf'; // Adjust the import path based on your folder structure
import styles from './files.module.css';
import FileBox from './filebox'; // Adjust path as necessary

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFiles = () => {
      // Replace 'your_hash_here' with the actual hash you want to query
      const hash = localStorage.getItem('hash'); // Assuming you have the hash stored in localStorage
      fetch(`/api/getFiles?hash=${hash}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const fileData = Object.entries(data).map(([fileName, cids]) => ({
            fileName,
            cids: Object.values(cids),
          }));
          setFiles(fileData);
        })
        .catch((error) => console.error('Error fetching files:', error));
    };

    // Initial fetch
    fetchFiles();
    
    // Set up polling every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(fetchFiles, 30000);
    
    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const filteredFiles = files.filter((file) =>
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
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
      {filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <FileBox key={index} fileName={file.fileName} />
          ))
        ) : (
          <div className={styles.noResults}>
            <img src="https://i.imgur.com/tT9WnxW.png" width={150}/>
            No results found</div>
        )}
      </main>
    </div>
  );
};

export default Home;
