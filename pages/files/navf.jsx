"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiKey, FiUpload, FiUser, FiSearch } from 'react-icons/fi';
import styles from './nav.module.css'; // Make sure this path is correct
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Import the dialog component
import DeleteAlertDialog from './dialogupload';

export default function NavBar() {
  const handleUploadFile = () => {
    console.log('Upload File clicked');
    // Set isDialogOpen to true to open the dialog
    dialog();
    // Add your logic for uploading a file
  };
  const [open, setOpen] = useState(false);

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
        <Link href="/passwords" passHref className={styles.navItem2}>
          <FiKey size={20} />
          <span>Passwords</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={styles.uploadTrigger}>
              <FiUpload size={20} />
              <span>Upload</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpen(true)}>Upload Files</DropdownMenuItem>
            <DropdownMenuItem onSelect={handleUploadPassword}>Upload Passwords</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteAlertDialog open={open}/>
        <div className={styles.padding}></div>
        <div className={styles.searchBar}>
          <span className={styles.searchIconPadding}>
            <FiSearch size={24} />
          </span>
          <input type="text" placeholder="Search..." />
        </div>
        <FiUser size={24} className={styles.profileIcon} />
      </div>
      {/* Render the dialog component when isDialogOpen is true */}
      
    </nav>
  );
}
