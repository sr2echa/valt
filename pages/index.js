"use client";
import React from 'react';
import Link from 'next/link';
// import './getstarted.css'; // Ensure you create this CSS file

const getstarted = () => {
  return (
    <div className="container">
      <div className="logo">
        {/* Make sure to replace `path/to/your/logo.svg` with the actual path to your logo */}
        <img src="/assets/images/valtlog.svg" alt="Logo" />
      </div>
      <h2 className="title-bold">A decentralized vault</h2>
      <p className="title-medium">to securely store your</p>
      <p className="title-medium">digital belongings</p>
      <Link href="/files" className="get-started-button">Get Started</Link>
    </div>
  );
};

export default getstarted;
