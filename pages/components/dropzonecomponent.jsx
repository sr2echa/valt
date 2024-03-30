import React, { useEffect } from 'react';
import 'dropzone/dist/dropzone.css'; // Import Dropzone styles
import styles from './styles.module.css'; // Import local module CSS
import Gun from 'gun'; // Import Gun
import Link from 'next/link';
import Dropzone from 'dropzone';
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

  function storeFile(hash, fileName, cids){
    const json_cids = JSON.stringify(cids);
    fetch('/api/storeFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
        },
        body: JSON.stringify({
            hash,
            fileName,
            cids: json_cids
        })
    }).then(response => {
        if (response.ok) {
            console.log('File stored successfully', response.json());
        } else {
            console.error('File not stored');
        }
    }
    ).catch(error => console.error('Error:', error));
  }

  const DropzoneComponent = () => {
    // const [uris, setUris] = useState([]);
    // const { mutateAsync: upload } = useStorageUpload(); // Assuming this hook is set up correctly

    // const divideFileIntoParts = useCallback((file) => {
    //     return new Promise((resolve, reject) => {
    //         const parts = [];
    //         const reader = new FileReader();
    //         reader.onload = function (e) {
    //             const buffer = e.target.result;
    //             const totalLength = buffer.byteLength;
    //             const partLength = totalLength / 10;

    //             for (let i = 0; i < 10; i++) {
    //                 const start = i * partLength;
    //                 const end = Math.min(start + partLength, totalLength);
    //                 const partBuffer = buffer.slice(start, end);
    //                 const blob = new Blob([partBuffer], { type: file.type });
    //                 const newFile = new File([blob], `${file.name}-part-${i+1}`, { type: file.type });
    //                 parts.push(newFile);
    //             }
    //             resolve(parts);
    //         };
    //         reader.onerror = error => reject(error);
    //         reader.readAsArrayBuffer(file);
    //     });
    // }, []);

    // const onDrop = useCallback(async (acceptedFiles) => {
    //     for (const file of acceptedFiles) {
    //         const parts = await divideFileIntoParts(file);
    //         let cids = {};

    //         for (let i = 0; i < parts.length; i++) {
    //             const part = parts[i];
    //             try {
    //                 // Assuming the `upload` function returns a promise that resolves with the IPFS CID
    //                 const result = await upload({ data: part });
    //                 cids[i] = result.uri; // Adjust according to the actual property that holds the CID
    //             } catch (error) {
    //                 console.error("Error uploading file part to IPFS:", error);
    //                 cids[i] = "Error"; // Placeholder for error handling
    //             }
    //         }

    //         console.log("Uploaded CIDs:", cids);
    //         // Optionally, do something with `cids` here (e.g., make a POST request to your server)
    //     }
    // }, [upload, divideFileIntoParts]);
    const [uris, setUris] = useState([]);
    const { mutateAsync: upload } = useStorageUpload();
  
    function divideFileIntoParts(file) {
      const file1 = new Blob([file], { type: file.type });
      return new Promise((resolve, reject) => {
        const parts = [];
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const buffer = e.target.result;
  
          const totalLength = buffer.byteLength;
          const partLength = totalLength / 10;
  
          for (let i = 0; i < 10; i++) {
            const start = i * partLength;
            let end = start + partLength;
  
            if (i === 9) end = totalLength;
  
            const partBuffer = buffer.slice(start, end);
            const blob = new Blob([partBuffer], { type: file.type });
  
            const newFile = new File([blob], `file${i + 1}`, { type: file.type });
            parts.push(newFile);
          }
          resolve(parts);
        };
  
        reader.onerror = (error) => reject(error);
  
        reader.readAsArrayBuffer(file1);
      });
    }
  
    const onDrop = useCallback(
      async (acceptedFiles) => {
        acceptedFiles.forEach(async (file) => {
          try {
            const parts = await divideFileIntoParts(file);
            const uploadPromises = parts.map((part) => upload({ data: [part] }));
            const uris = await Promise.all(uploadPromises);
            setUris(uris); // Update state with URIs
            console.log("uris:", uris);
            //uris is an array or arrays of the cids of the parts of the file
            //i want the cidsto be instead be made into a object with index as key and cid as value

            const cidsObject = {};
            for (let i = 0; i < uris.length; i++) {
                cidsObject[i] = uris[i][0].replace("ipfs://", "");
            }
            console.log("cidsObject:", cidsObject);
            //get hash from local storage
            const hash = localStorage.getItem('hash');
            storeFile(hash, file.name, cidsObject);
          } catch (error) {
            console.error(
              "Error processing or uploading file part to IPFS:",
              error
            );
          }
        });
      },
      [upload]
    );

    useEffect(() => {}, [uris]);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={`dropzone ${styles.customDropzone}`} id="myDropzone">
            <input {...getInputProps()} />
            <p>Drop files here, or click to select files</p>
        </div>
    );
};

export default DropzoneComponent;
