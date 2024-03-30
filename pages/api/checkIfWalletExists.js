import gun from '../contexts/GunContext';

// async function checkIfWalletExists(walletId) {
//     let walletExists = false;
//     gun.get(walletId).once((wallet) => {
//         if (wallet) {
//             walletExists = true;
//         }
//     });
//     return walletExists;
// }

// async function checkIfWalletExists(walletId) {
//     return new Promise((resolve, reject) => {
//         gun.get(walletId).once((wallet) => {
//             resolve(!!wallet); // Resolve with true if wallet exists, false otherwise
//         });
//     });
// }

// export default async function handler(req, res) {
//     const { wallet } = req.query;
//     if (req.method === 'GET') {
//         try {
//             const walletExists = await checkIfWalletExists(wallet);
//             if (!walletExists) {
//                 throw new Error('Wallet not found');
//             }
//             const files = await getFiles(wallet);
//             res.status(200).json(files);
//         } catch (error) {
//             console.log('Error:', error.message);
//             res.status(404).json({ message: error.message });
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }

async function checkIfWalletExists(walletId) {
    return new Promise((resolve) => {
        gun.ge('valts').get(walletId).once((wallet) => {
            const exists = !!wallet;
            resolve(exists);
        });
    });
}

// The API route handler
export default async function handler(req, res) {
    if (req.method === 'GET') {
        
        if (!req.headers.authorization || req.headers.authorization !== process.env.AUTH_TOKEN) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        
        const { walletId } = req.query; // Extract walletId from query parameters

        // Validate the input
        if (!walletId) {
            return res.status(400).json({ message: 'walletId query parameter is required' });
        }

        try {
            const exists = await checkIfWalletExists(walletId); 
        
            const response = {};
            response[walletId] = exists;
            
            return res.status(200).json(response);
        } catch (error) {
            console.error('Error checking wallet existence:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
