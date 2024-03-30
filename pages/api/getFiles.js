import gun from '../contexts/GunContext';

async function fetchFilesForWallet(hash) {
    return new Promise((resolve, reject) => {
        const walletNode = gun.get('valts').get(hash);
        const result = {};

        walletNode.get('files').once((files) => {
            const filenames = Object.keys(files).filter(filename => filename !== '_');

            if (filenames.length === 0) {
                console.log(`No files for wallet ${hash}.`);
                resolve({});
                return;
            }

            let filesProcessed = 0;
            filenames.forEach((filename) => {
                walletNode.get('files').get(filename).once((fileData) => {
                    const cids = Object.keys(fileData || {}).reduce((acc, key) => {
                        if (!isNaN(parseInt(key)) && key !== '_') {
                            acc[key] = fileData[key];
                        }
                        return acc;
                    }, {});
                    result[filename] = cids;

                    filesProcessed++;
                    if (filesProcessed === filenames.length) {
                        resolve(result);
                    }
                });
            });
        });
    });
}


async function getFiles(hash) {
    try {
        const files = await fetchFilesForWallet(hash);
        if (Object.keys(files).length > 0) {
            return files; // Return the files if found
        } else {
            throw new Error('Files not found');
        }
    } catch (error) {
        throw error; // Propagate error
    }
}



export default async function handler(req, res) {
    const { hash } = req.query;
    if (req.method === 'GET') {
        try {
            // let r = 
            // console.log('getFiles:', r);
            const files  = await getFiles(hash); 
            // res.status(200).json(await getFiles(wallet));
            res.status(200).json(files);
        } catch (error) {
            console.log('Error:', error);
            res.status(404).json({ message: 'Files not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}