"use client";

import React from 'react'
import styles from "./nav.module.css";
import Image from 'next/image';
import Link from 'next/link';
import Dropzone from 'dropzone'; // Import Dropzone
import 'dropzone/dist/dropzone.css'; // Import Dropzone styles
import {useState,useEffect} from 'react';
import Nav from '../components/nav';
import DropzoneComponent from '../components/dropzonecomponent';

const App = () => {
    return (
        <div>
            <Nav />
            <DropzoneComponent />
        </div>
    );
};

export default App;
