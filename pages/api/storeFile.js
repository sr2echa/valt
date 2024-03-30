// import { storeFile } from '../utils/GunFunctions';

import gun from '../contexts/GunContext';

async function storeFile(hash, filename, cidsObject) {
    const walletNode = gun.get('valts').get(hash);
    const fileNode = walletNode.get('files').get(filename);
    for (const [key, cid] of Object.entries(cidsObject)) {
        fileNode.get(key).put(cid);
    }
    console.log(`File '${filename}' stored for wallet: ${hash}`);
    return 0;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (!req.headers.authorization || req.headers.authorization !== process.env.AUTH_TOKEN) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        
        console.log('req.body:', req.body)
        const { hash, fileName, cids } = req.body;
        const json_cids = JSON.parse(cids);
        let r = await storeFile(hash, fileName, json_cids);
        if (!r) {
            res.status(200).json({ message: 'File stored successfully' });
        } else {
            res.status(404).json({ message: 'File not stored' });
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}


