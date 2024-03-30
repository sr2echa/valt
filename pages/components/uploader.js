import React, { useState } from 'react';
import { encryptAndUploadFile } from '../integrations/arweaveHelper';

function ArweaveUploader() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const fileBuffer = await file.arrayBuffer();
        const response = await encryptAndUploadFile(Buffer.from(fileBuffer), file.name, {/* User Wallet Here */});
        console.log('Upload Response:', response);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload to Arweave</button>
        </div>
    );
}

export default ArweaveUploader;
