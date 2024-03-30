"use client";
import React from 'react';
import Link from 'next/link';
// import './getstarted.css'; // Ensure you create this CSS files
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
} from "./ui/alert-dialog"
import DropzoneComponent from './dropzonecomponent';
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
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="get-started-button">Get Started</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload your Seed image here!</AlertDialogTitle>
          <AlertDialogDescription>
            This Image will be used as your password
          </AlertDialogDescription>
        </AlertDialogHeader>
        <DropzoneComponent/>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      
    </div>
  );
};

export default getstarted;
