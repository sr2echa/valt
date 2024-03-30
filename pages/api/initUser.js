import gun from '../contexts/GunContext';

export default function handler(req, res) {
    if (req.method === 'POST') {
        
        if (!req.headers.authorization || req.headers.authorization !== process.env.AUTH_TOKEN) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { hash, walletId } = req.body;
        if (!hash || !walletId) {
            return res.status(400).json({ message: 'Invalid request. Wallet ID or hash missing.' });
        }
        initializeUser(hash, walletId, (err) => {
            if (!err) {
                console.log(`User initialized for wallet: ${hash}`);
                res.status(200).json({ message: 'User initialized successfully' });
            } else {
                console.error(`Error initializing user for wallet ${hash}:`, err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

function initializeUser(hash, walletId, callback) {
    if (!hash || !walletId) {
        callback('Invalid wallet ID or hash');
        return;
    }
    gun.get('valts').get(hash).get('walletId').put(walletId, (ack) => {
        if (ack.err) {
            callback(ack.err);
        } else {
            callback(null);
        }
    });
}
