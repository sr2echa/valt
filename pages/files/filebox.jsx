import React from 'react';
import { FaFileImage, FaFileVideo, FaFilePdf, FaFileAlt } from 'react-icons/fa';
import styles from './filebox.module.css'; // Ensure your CSS module is updated with styles below

const getFileIcon = (fileName) => {
  if (fileName.endsWith('.png')) return <FaFileImage />;
  if (fileName.endsWith('.mp4')) return <FaFileVideo />;
  if (fileName.endsWith('.pdf') || fileName.endsWith('.docx')) return <FaFilePdf />;
  return <FaFileAlt />; // Default icon for other file types
};

const FileBox = ({ fileName, cids }) => {
  const fetchAndDownloadFile = () => {
    const fetchBlobFromCid = (cid) => {
      const formattedCid = cid.replace("ipfs://", "");
      return fetch(`https://ipfs.io/ipfs/${formattedCid}`).then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.blob();
      });
    };

    Promise.all(cids.map((cid) => fetchBlobFromCid(cid))).then((blobs) => {
      const commonType = blobs.length > 0 ? blobs[0].type : "application/octet-stream";
      const combinedBlob = new Blob(blobs, { type: commonType });
      const url = URL.createObjectURL(combinedBlob);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = fileName; // Using the original fileName including extension
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }).catch((error) => {
      console.error("Error downloading the file:", error);
    });
  };

  return (
    <div className={styles.fileBox} onClick={fetchAndDownloadFile}>
      <span className={styles.icon}>{getFileIcon(fileName)}</span>
      <span className={styles.fileName}>{fileName}</span>
    </div>
  );
};

export default FileBox;
