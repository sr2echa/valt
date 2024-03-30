import gun from '../contexts/GunContext';

// async function storePassword(hash, identifier, password) {
//     const walletNode = gun.get('valts').get(hash);
//     walletNode.get('passwords').get(identifier).put(password);
//     console.log(`Password for '${identifier}' stored for wallet with hash: ${hash}`);
//     return 0;
// }


async function storePassword(hash, identifier, password) {
    console.log('storePassword:', hash, identifier, password);
    const walletNode = gun.get('valts').get(hash);
    // Retrieve the current passwords object, update it, and put it back
    walletNode.get('passwords').get(identifier).put({password}, ack => {
        if (ack.err) {
            console.error('Error storing password:', ack.err);
        } else {
            console.log(`Password for '${identifier}' stored for wallet with hash: ${hash}`);
        }
    });
    return 0;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (!req.headers.authorization || req.headers.authorization !== process.env.AUTH_TOKEN) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { hash, identifier, password } = req.body;
        let r = await storePassword(hash, identifier, password);
        if (!r) {
            res.status(200).json({ message: 'Password stored successfully' });
        } else {
            res.status(404).json({ message: 'Password not stored' });
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}