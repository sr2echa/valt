import gun from '../contexts/GunContext';

export default async function handler(req, res) {
    if (req.method === 'GET') {

        if (!req.headers.authorization || req.headers.authorization !== process.env.AUTH_TOKEN) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
}


        // Fetch all wallets under the 'wallets' node
        let wallets = {};
        gun.get('valts').map().once((wallet, id) => {
            if(wallet) {
                wallets[id] = true; // or wallet if you want to store the wallet object
            }
        }).then(() => {
            //check for each wallet if the wallet[hash matches the hash in the query]
            let hash = req.query.hash;
            let walletIds = Object.keys(wallets);
            for (let i = 0; i < walletIds.length; i++) {
                if (walletIds[i] !== hash) {
                    delete wallets[walletIds[i]];
                }
            }
            if (Object.keys(wallets).length === 0) {
                wallets[hash] = false;
            }
            res.status(200).json(wallets);
        }).catch(error => {
            console.error('Error fetching wallets:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

