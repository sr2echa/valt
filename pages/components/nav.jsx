import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiKey, FiUpload, FiUser, FiSearch } from 'react-icons/fi';
import styles from './nav.module.css'; // Make sure this path is correct

export default function NavBar() {
  const [isUploadMenuVisible, setUploadMenuVisible] = useState(false);

  const toggleUploadMenu = () => setUploadMenuVisible(!isUploadMenuVisible);
  const handleUploadFile = () => {
  console.log('Upload File clicked');
  // Add your logic for uploading a file
    };

    const handleUploadPassword = () => {
    console.log('Upload Password clicked');
    // Add your logic for uploading a password
    };


  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref className={styles.logo}>
          <Image src="/assets/images/valtlog.svg" alt="Valt" width={100} height={40} priority />
      </Link>
      <div className={styles.navItems}>
        <Link href="/files" passHref className={styles.navItem}>
            <FiFileText size={20} />
            <span>Files</span>
          
        </Link>
        <Link href="/passwords" passHref className={styles.navItem}>
        
            <FiKey size={20} />
            <span>Passwords</span>
        
        </Link>
        <button className={styles.navItemend} onClick={toggleUploadMenu}>
            <FiUpload size={20} />
            <span>Upload</span>
        </button>
        {isUploadMenuVisible && (
        <div className={styles.dropdownMenu}>
            <button onClick={handleUploadFile} className={styles.dropdownItem}>
            Upload File
            </button>
            <button onClick={handleUploadPassword} className={styles.dropdownItem}>
            Upload Password
            </button>
        </div>
        )}

        <div className={styles.searchBar}>
        <span className={styles.searchIconPadding}>
            <FiSearch size={24} />
        </span>

          <input type="text" placeholder="Search..." />
        </div>
        <FiUser size={24} className={styles.profileIcon} />
      </div>
    </nav>
  );
}
