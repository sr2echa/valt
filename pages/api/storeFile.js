// // import { storeFile } from '../utils/GunFunctions';

// import gun from '../contexts/GunContext';

// async function storeFile(hash, filename, cidsObject) {
//     const walletNode = gun.get('valts').get(hash);
//     const fileNode = walletNode.get('files').get(filename);
//     for (const [key, cid] of Object.entries(cidsObject)) {
//         fileNode.get(key).put(cid);
//     }
//     console.log(`File '${filename}' stored for wallet: ${hash}`);
//     return 0;
// }

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         console.log('req.body:', req.body)
//         const { hash, fileName, cids } = req.body;
//         const json_cids = JSON.parse(cids);
//         let r = await storeFile(hash, fileName, json_cids);
//         if (!r) {
//             res.status(200).json({ message: 'File stored successfully' });
//         } else {
//             res.status(404).json({ message: 'File not stored' });
//         }
//     }
//     else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }

import gun from '../contexts/GunContext';

async function storePassword(hash, identifier, password) {
    // Directly store the password under the given identifier for the specified hash
    gun.get('valts').get(hash).get('passwords').get(identifier).put(password, ack => {
        if (ack.err) {
            // Handle any potential error during the storage process
            console.error('Error storing password:', ack.err);
        } else {
            console.log(`Password for '${identifier}' stored for wallet with hash: ${hash}`);
        }
    });
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { hash, identifier, password } = req.body;
        await storePassword(hash, identifier, password);
        res.status(200).json({ message: 'Password stored successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
