"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFileText, FiKey, FiUpload, FiUser, FiSearch } from 'react-icons/fi';
import styles from './nav.module.css'; // Make sure this path is correct
import { useRouter } from 'next/router';
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
// Import the dialog component
import DropzoneComponent from '../components/dropzonecomponent';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
export default function NavBar({ searchQuery, setSearchQuery }){
  const handleUploadFile = () => {
    console.log('Upload File clicked');
    // Set isDialogOpen to true to open the dialog
    dialog();
    // Add your logic for uploading a file
  };
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const router = useRouter();
  const handleUploadPassword = async () => {
    const hash = localStorage.getItem('hash');
    const identifier = document.getElementById('passwordIdentifier').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/api/storePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
      },
      body: JSON.stringify({
        hash,
        identifier,
        password
      })
    });
    console.log(hash, identifier, password)
    const data = await response.json();
    console.log('data:', data);
  };

  const handleButtonClick = () => {
    // localStorage.clear();
    window.location.href ='/logout';
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
        <div className={styles.padding}></div>

        <AlertDialog>
      <AlertDialogTrigger asChild>
        <button variant="outline">Upload File</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload File</AlertDialogTitle>
          <AlertDialogDescription>
           Your files will be safely saved info IPFS
          </AlertDialogDescription>
        </AlertDialogHeader>
        <DropzoneComponent/>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <div className={styles.padding2}></div>

<AlertDialog>
  <AlertDialogTrigger asChild>
    <button className="custom-button">Upload Password</button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Upload Password</AlertDialogTitle>
      <AlertDialogDescription>
        Your passwords will be saved safely into IPFS
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <label htmlFor="passwordIdentifier">Password Identifier:</label>
        <input type="text" id="passwordIdentifier" placeholder="Enter password identifier" className={styles.input} />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeh older="Enter password" className={styles.input} />
      </div>
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


        <div className={styles.padding2}></div>
        <div className={styles.searchBar}>
          <span className={styles.searchIconPadding}>
            <FiSearch size={18} color='#c0c0c0'/>
          </span>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchInputChange}/>
        </div>
        
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><FiUser size={24} className={styles.profileIcon} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            
          </DropdownMenuItem>
          
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <button onClick={handleButtonClick}>Log Out</button>
        </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
      {/* Render the dialog component when isDialogOpen is true */}
      
    </nav>
  );
}
