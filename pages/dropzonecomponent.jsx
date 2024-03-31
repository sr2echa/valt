import React, { useEffect } from 'react';
import 'dropzone/dist/dropzone.css'; // Import Dropzone styles
import styles from './styles.module.css'; // Import local module CSS
import Dropzone from 'dropzone';

//a function that will make a get request to /checkHash with the hash as a query parameter and return the response
async function checkHash(hash) {
    console.log('hash', hash);
    localStorage.setItem('hash', hash);
    const response = await fetch(`/api/checkHash?hash=${hash}`, {
        method: 'GET',
        headers: {
            'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
        }
    });
    const r = await response.json();
    console.log('response:', r);
    return r[hash];
};


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
                            .then(async hash => await checkHash(hash))
                            //then based on the response i want you to handle the next steps. the returned data will be of this type : { `${hash}`: true/false }. If its true, just store the hash in local storge and go to /files. else if its false, go to /register
                            .then(async data => {
                                //get the key of the object
                                const hash = Object.keys(data)[0];
                                // await localStorage.setItem('hash', hash);
                                return localStorage.getItem('hash');
                            })
                            .then(hash => console.log('hash:', hash))
                            .then(hash => {
                                if (hash!=undefined && hash!=null && hash!='') {
                                    window.location.href = '/files';
                                } else {
                                    window.location.href = '/register';
                                }
                            })
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
