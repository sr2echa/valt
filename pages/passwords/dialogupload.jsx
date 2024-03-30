// AlertDialogDemo.js
"use client";
import React from 'react';
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import CustomDropzone from './customdropzone'; // Adjust the import path as necessary.

// AlertDialogDemo.js adjustments for external control
export function dialog({ isOpen, onClose }) {
    // Early return if not open
    if (!isOpen) return null;
  
    return (
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload File</AlertDialogTitle>
            <AlertDialogDescription>
              Select a file to upload. You can drag and drop a file inside the box or click to select a file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <CustomDropzone />
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button>Upload</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
// In the file where your component is defined
export default dialog;
