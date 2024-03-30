"use client";
import React, { useEffect } from 'react';
import 'dropzone/dist/dropzone.css'; // Import Dropzone styles
import styles from './styles.module.css'; // Import local module CSS
import Gun from 'gun'; // Import Gun
import Link from 'next/link';
import Dropzone from 'dropzone';
const customdropzone = () => {
    useEffect(() => {
        // Initialize Dropzone when component mounts
        const dropzoneElement = document.getElementById("myDropzone");
        if (dropzoneElement && !dropzoneElement.dropzone) {
            const gun = Gun();
            new Dropzone(dropzoneElement, {
                url: "/upload",
                autoProcessQueue: false,
                init: function () {
                    this.on("addedfile", function (file) {
                        // Convert file to base64
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const base64File = e.target.result;
                            // Save file to Gun
                            gun.get('files').set({ name: file.name, data: base64File });
                        }
                        reader.readAsDataURL(file);
                    });
                }
            });
        }
    }, []);

    return (
        <div className={`dropzone ${styles.customDropzone}`} id="myDropzone">
            <div className="dz-message" data-dz-message>
                Drop files here or click to upload
            </div>
        </div>
    );
};

export default customdropzone;
