"use client";
import React, { useEffect } from "react";
import "dropzone/dist/dropzone.css"; // Import Dropzone styles
import styles from "./styles.module.css"; // Import local module CSS
import Gun from "gun"; // Import Gun
import Link from "next/link";
// import Dropzone from "dropzone";
import { useDropzone } from 'react-dropzone';
import { useStorageUpload } from "@thirdweb-dev/react";
import { useState, useCallback } from "react";

function handleUris(uris) {
  console.log("Received URIs:", uris);
}

function fetchBlobFromCid(cid) {
  // Remove the "ipfs://" scheme if present
  cid = cid[0];
  const formattedCid = cid.replace("ipfs://", "");
  return fetch(`https://ipfs.io/ipfs/${formattedCid}`).then((response) => {
    if (!response.ok) throw new Error("Failed to fetch");
    return response.blob();
  });
}

function combineBlobsFromCids(cids) {
  return Promise.all(cids.map((cid) => fetchBlobFromCid(cid))).then((blobs) => {
    const commonType =
      blobs.length > 0 ? blobs[0].type : "application/octet-stream";
    const combinedBlob = new Blob(blobs, { type: commonType });
    console.log(combinedBlob);
    return combinedBlob;
  });
}

function displayImage(blob) {
  const url = URL.createObjectURL(blob);
  const img = document.createElement("img");
  img.src = url;
  img.onload = () => {
    URL.revokeObjectURL(url);
  };
  document.body.appendChild(img);
}

function fetchAndDisplayImageCids(uris) {
  console.log("-----------------------------------------------:", uris);
  combineBlobsFromCids(uris)
    .then((combinedBlob) => {
      displayImage(combinedBlob);
      const blobType = combinedBlob.type || "application/octet-stream";
      const fileExtension = blobType.split("/")[1] || "bin"; // Default extension if not determinable
      const fileName = `combined-file.${fileExtension}`;
      const url = URL.createObjectURL(combinedBlob);

      // Create a temporary <a> element to trigger the download
      const a = document.createElement("a");
      document.body.appendChild(a); // Append the element to the document
      a.style = "display: none"; // Hide the element
      a.href = url;
      a.download = fileName; // Name of the file to be downloaded
      a.click(); // Trigger the download

      // Clean up by revoking the blob URL and removing the <a> element
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error("Error combining image parts:", error);
    });
}




const CustomDropzone = () => {
    const [uris, setUris] = useState([]);
    const { mutateAsync: upload } = useStorageUpload(); // Assuming this hook is set up correctly

    const divideFileIntoParts = (file) => {
        return new Promise((resolve, reject) => {
            const fileBlob = new Blob([file], { type: file.type });
            const parts = [];
            const reader = new FileReader();
            reader.onload = function (e) {
                const buffer = e.target.result;
                const totalLength = buffer.byteLength;
                const partLength = totalLength / 10;

                for (let i = 0; i < 10; i++) {
                    const start = i * partLength;
                    let end = start + partLength;
                    if (i === 9) end = totalLength; // Ensure the last part goes to the end of the file

                    const partBuffer = buffer.slice(start, end);
                    const blob = new Blob([partBuffer], { type: file.type });
                    const newFile = new File([blob], `file-part-${i+1}`, { type: file.type });
                    parts.push(newFile);
                }
                resolve(parts);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(fileBlob);
        });
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        // Process each file separately
        for (const file of acceptedFiles) {
            try {
                const parts = await divideFileIntoParts(file);
                const uploadPromises = parts.map(part => upload({ data: part }));
                const urisResults = await Promise.all(uploadPromises);
                setUris(currentUris => [...currentUris, ...urisResults.map(result => result.uris)]);
            } catch (error) {
                console.error("Error processing or uploading file part to IPFS:", error);
            }
        }
    }, [upload]); // `upload` is a dependency here

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={`dropzone ${styles.customDropzone}`} id="myDropzone">
            <input {...getInputProps()} />
            <p>Drop files here, or click to select files</p>
        </div>
    );
};

export default CustomDropzone;