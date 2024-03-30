import React, { useEffect } from 'react';
import 'dropzone/dist/dropzone.css'; // Import Dropzone styles
import styles from './styles.module.css'; // Import local module CSS
import Dropzone from 'dropzone';



const DropzoneComponent = () => {
    useEffect(() => {
        const dropzoneElement = document.getElementById("myDropzone");
        if (dropzoneElement && !dropzoneElement.dropzone) {
            const dropzone = new Dropzone(dropzoneElement, {
                url: "/upload",
                autoProcessQueue: true,
                maxFiles: 1,
                acceptedFiles: 'image/*',
                init: function () {
                    this.on("addedfile", function (file) {
                        generateSHA256Hash(file)
                            .then(hash => console.log("SHA256 Hash:", hash))
                            .catch(error => console.error("Error:", error));
                    });
                }
            });
        }
    }, []);

    const generateSHA256Hash = async (file) => {
        const buffer = await file.arrayBuffer();
        const digest = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(digest));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    };

    return (
        <div className={`dropzone ${styles.customDropzone}`} id="myDropzone">
            <div className="dz-message" data-dz-message>
                Drop image here or click to upload
            </div>
        </div>
    );
};

export default DropzoneComponent;
