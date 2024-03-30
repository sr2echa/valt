// components/FileBox.js
import React from 'react';
import { FaFileImage, FaFileVideo, FaFilePdf, FaFileAlt } from 'react-icons/fa';
import styles from './filebox.module.css'; // Ensure you have this CSS module created

const getFileIcon = (fileName) => {
  if (fileName.endsWith('.png')) return <FaFileImage />;
  if (fileName.endsWith('.mp4')) return <FaFileVideo />;
  if (fileName.endsWith('.pdf') || fileName.endsWith('.docx')) return <FaFilePdf />;
  return <FaFileAlt />; // Default icon for other file types
};

const FileBox = ({ fileName }) => {
  return (
    <div className={styles.fileBox}>
      <span className={styles.icon}>{getFileIcon(fileName)}</span>
      <span className={styles.fileName}>{fileName}</span>
    </div>
  );
};

export default FileBox;
